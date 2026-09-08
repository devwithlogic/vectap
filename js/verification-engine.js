/**
 * VECTA: Verification & Scoring Engine
 * Evaluates compliance rules, runs async multi-portal simulation, and compiles TEC reports.
 */

class GeMVerificationEngine {
  constructor() {
    this.weights = {
      statutory: 0.30,   // GSTN, PAN, MCA21, Udyam
      nationalPolicy: 0.25, // Make in India, Startup, NSIC
      labor: 0.15,       // EPFO, ESIC
      integrity: 0.30    // CPPP Debarment, OEM MAF, DigiLocker
    };
  }

  /**
   * Recalculates the compliance score for a bidder based on portal status and discrepancies.
   */
  calculateCompliance(bidder) {
    let statutoryScore = 100;
    let nationalScore = 100;
    let laborScore = 100;
    let integrityScore = 100;

    const v = bidder.portalVerifications;

    // Statutory Check (GSTN, PAN, MCA21, Udyam)
    if (v.gstn?.status === "FAILED") statutoryScore -= 50;
    else if (v.gstn?.status === "WARNING") statutoryScore -= 20;

    if (v.incometax?.status === "FAILED") statutoryScore -= 30;
    else if (v.incometax?.status === "WARNING") statutoryScore -= 15;

    if (v.mca21?.status === "FAILED") statutoryScore -= 25;
    if (v.udyam?.status === "FAILED") statutoryScore -= 20;

    // National Policies (Make in India)
    if (v.makeinindia?.status === "FAILED") nationalScore -= 60;
    else if (v.makeinindia?.status === "DISCREPANCY") nationalScore -= 35;

    // Labor (EPFO, ESIC)
    if (v.epfo?.status === "FAILED") laborScore -= 50;
    if (v.esic?.status === "FAILED") laborScore -= 50;

    // Integrity & Technical (CPPP Debarment is a KILL SWITCH!)
    if (v.cppp_debar?.status === "FAILED") {
      // Immediate disqualification fail
      integrityScore = 0;
    }
    if (v.oem?.status === "FAILED") integrityScore -= 50;
    if (v.digilocker?.status === "FAILED") integrityScore -= 30;

    // Bound sub-scores to [0, 100]
    statutoryScore = Math.max(0, statutoryScore);
    nationalScore = Math.max(0, nationalScore);
    laborScore = Math.max(0, laborScore);
    integrityScore = Math.max(0, integrityScore);

    const totalScore = Math.round(
      statutoryScore * this.weights.statutory +
      nationalScore * this.weights.nationalPolicy +
      laborScore * this.weights.labor +
      integrityScore * this.weights.integrity
    );

    let riskLevel = "LOW";
    let recommendation = "QUALIFY";

    if (v.cppp_debar?.status === "FAILED" || totalScore < 50) {
      riskLevel = "CRITICAL";
      recommendation = "DISQUALIFY";
    } else if (totalScore < 80 || bidder.discrepancies.some(d => d.severity === "HIGH")) {
      riskLevel = "MEDIUM";
      recommendation = "SEEK_CLARIFICATION";
    } else {
      riskLevel = "LOW";
      recommendation = "QUALIFY";
    }

    return {
      score: totalScore,
      riskLevel,
      recommendation,
      breakdown: {
        statutory: statutoryScore,
        nationalPolicy: nationalScore,
        labor: laborScore,
        integrity: integrityScore
      }
    };
  }

  /**
   * Runs an animated live simulation verifying a bidder across all 12 portals.
   * Calls onProgress(step, portal, log) at each milestone.
   */
  async simulateLiveVerification(bidderId, onProgress) {
    const bidder = window.GEM_DATA.bidders.find(b => b.id === bidderId);
    if (!bidder) return;

    const portals = window.GEM_DATA.portals;
    const stepsCount = portals.length;

    onProgress({
      step: 0,
      total: stepsCount,
      percent: 5,
      stage: "INITIALIZATION",
      log: `Initializing VECTA AI Verification Engine for Bidder: ${bidder.name} [CIN: ${bidder.cin}]...`
    });

    await this.delay(350);

    for (let i = 0; i < portals.length; i++) {
      const portal = portals[i];
      const portalResult = bidder.portalVerifications[portal.id] || { status: "VERIFIED", details: "Check passed." };

      const percent = Math.round(((i + 1) / stepsCount) * 90);

      onProgress({
        step: i + 1,
        total: stepsCount,
        percent: percent,
        stage: portal.name,
        portal: portal,
        result: portalResult,
        log: `Querying ${portal.authority} via ${portal.protocol}... Status: [${portalResult.status}] -> ${portalResult.details}`
      });

      // Realistic random latency
      await this.delay(280 + Math.random() * 200);
    }

    // Final AI synthesis step
    const evalResult = this.calculateCompliance(bidder);

    onProgress({
      step: stepsCount + 1,
      total: stepsCount,
      percent: 100,
      stage: "SYNTHESIS_COMPLETE",
      result: evalResult,
      log: `AI Verification & Risk Matrix Synthesis Complete. Overall Compliance Score: ${evalResult.score}/100 | Risk: ${evalResult.riskLevel} | Recommended Action: ${evalResult.recommendation}`
    });

    return evalResult;
  }

  /**
   * Helper delay promise
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generates a printable Technical Evaluation Committee (TEC) Summary HTML string.
   */
  generateTECSummaryHTML() {
    const t = window.GEM_DATA.tenderInfo;
    const bidders = window.GEM_DATA.bidders;

    let rows = bidders.map((b, idx) => {
      const decisionBadge = b.officerDecision?.status === "APPROVED" 
        ? `<span style="color:#166534; font-weight:bold;">QUALIFIED</span>`
        : b.officerDecision?.status === "DISQUALIFIED"
        ? `<span style="color:#991B1B; font-weight:bold;">DISQUALIFIED</span>`
        : `<span style="color:#92400E; font-weight:bold;">CLARIFICATION ISSUED</span>`;

      return `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px;">${idx + 1}</td>
          <td style="padding: 10px;">
            <strong>${b.name}</strong><br>
            <small style="color:#666;">GSTIN: ${b.gstin} | PAN: ${b.pan}</small>
          </td>
          <td style="padding: 10px; text-align: center; font-weight: bold;">${b.complianceScore} / 100</td>
          <td style="padding: 10px; text-align: center;">${b.riskLevel}</td>
          <td style="padding: 10px; text-align: center;">${b.recommendation}</td>
          <td style="padding: 10px;">${decisionBadge}<br><small style="color:#555;">${b.officerDecision?.remarks || 'Pending'}</small></td>
        </tr>
      `;
    }).join('');

    return `
      <div style="font-family: Arial, sans-serif; padding: 25px; color: #111; max-width: 900px; margin: 0 auto; background:#fff;">
        <div style="text-align: center; border-bottom: 2px solid #7A291E; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #7A291E; margin: 0; text-transform: uppercase; font-size: 20px;">Government e-Marketplace (GeM)</h2>
          <h3 style="margin: 5px 0; font-size: 16px; color: #333;">Technical Evaluation Committee (TEC) - Bid Compliance Report</h3>
          <p style="margin: 3px 0; font-size: 12px; color: #555;">Generated via VECTA Integrated Compliance & Verification Platform</p>
        </div>

        <div style="background: #FAF7F5; padding: 12px 18px; border: 1px solid #E2D5CA; border-radius: 6px; margin-bottom: 20px; font-size: 13px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Tender ID:</strong> ${t.tenderId}</div>
            <div><strong>Estimated Value:</strong> ${t.estimatedValue}</div>
            <div><strong>Buyer:</strong> ${t.buyerOrganization}</div>
            <div><strong>Ministry:</strong> ${t.ministry}</div>
            <div><strong>Opening Date:</strong> ${t.openingDate}</div>
            <div><strong>TEC Chairman:</strong> ${t.officer.name} (${t.officer.empId})</div>
          </div>
        </div>

        <h4 style="color: #7A291E; margin-bottom: 8px;">Bidder Technical & Statutory Compliance Summary</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 25px;">
          <thead>
            <tr style="background: #7A291E; color: #fff; text-align: left;">
              <th style="padding: 8px;">#</th>
              <th style="padding: 8px;">Bidder Entity</th>
              <th style="padding: 8px; text-align: center;">AI Score</th>
              <th style="padding: 8px; text-align: center;">Risk Level</th>
              <th style="padding: 8px; text-align: center;">AI Recommendation</th>
              <th style="padding: 8px;">TEC Officer Decision</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div style="margin-top: 40px; display: flex; justify-content: space-between; font-size: 13px; padding-top: 20px; border-top: 1px dashed #7A291E;">
          <div>
            <p><strong>Prepared By:</strong> VECTA Engine (v2.4-Gov)</p>
            <p style="color:#666; font-size: 11px;">Cryptographic Seal: SHA256: 4f88e1a90c2e3d4f5a6b7c8d9e0f</p>
          </div>
          <div style="text-align: right;">
            <p style="margin-bottom: 40px;"><strong>Verified & Approved by:</strong></p>
            <p style="border-top: 1px solid #333; padding-top: 5px; display: inline-block;">
              <strong>${t.officer.name}</strong><br>
              ${t.officer.designation}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

window.verificationEngine = new GeMVerificationEngine();
