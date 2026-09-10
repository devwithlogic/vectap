/**
 * VECTA: Compliance Scoring & Risk Assessment Service
 */

class VectaScoringService {
  constructor() {
    this.weights = {
      statutory: 0.30,   // GSTN, PAN, MCA21, Udyam
      nationalPolicy: 0.25, // Make in India, Startup, NSIC
      labor: 0.15,       // EPFO, ESIC
      integrity: 0.30    // CPPP Debarment, OEM MAF, DigiLocker
    };
  }

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
      integrityScore = 0;
    }
    if (v.oem?.status === "FAILED") integrityScore -= 50;
    if (v.digilocker?.status === "FAILED") integrityScore -= 30;

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
}

window.scoringService = new VectaScoringService();
