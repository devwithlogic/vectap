/**
 * VECTA: Master Bidders Dataset
 * Concatenates qualified and flagged bidders
 */

window.GEM_BIDDERS = [
  ...window.GEM_BIDDERS_QUALIFIED,
  ...window.GEM_BIDDERS_FLAGGED
];
