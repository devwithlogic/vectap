/**
 * VECTA: Verification Engine (Aggregator for Backward Compatibility)
 */

window.verificationEngine = window.verificationEngine || {
  calculateCompliance: (b) => window.scoringService.calculateCompliance(b),
  simulateLiveVerification: (id, cb) => window.simulationService.simulateLiveVerification(id, cb),
  generateTECSummaryHTML: () => window.reportService.generateTECSummaryHTML()
};
