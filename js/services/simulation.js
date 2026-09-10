/**
 * VECTA: Live Multi-Portal Verification Simulation Service
 */

class VectaSimulationService {
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
    const evalResult = window.scoringService.calculateCompliance(bidder);

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

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

window.simulationService = new VectaSimulationService();
