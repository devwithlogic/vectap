// USP 1: Collusion & Bidder Cartel Network Graph Data
window.GEM_COLLUSION_DATA = {
  ringRiskScore: 94.8,
  status: "CRITICAL_CARTEL_SUSPECTED",
  regulatoryBreach: "Competition Act 2002 Sec 3(3) & GeM Anti-Collusion Policy",
  summary: "Apex Infra & Horizon Telematics exhibit shadow nexus: common director, identical IPv4 submission subnet, and 14-min bid timing proximity.",
  nodes: [
    { id: "b1", label: "Bharat Cloud Tech", type: "bidder", risk: "low", x: 120, y: 160 },
    { id: "b2", label: "Apex Infra & Computing", type: "bidder", risk: "medium", x: 380, y: 120 },
    { id: "b3", label: "Horizon Telematics", type: "bidder", risk: "critical", x: 440, y: 260 },
    { id: "b4", label: "Shreshtha Micro (MSE)", type: "bidder", risk: "low", x: 140, y: 280 },
    { id: "dir1", label: "Ramesh K. Verma (DIN 08492011)", type: "director", isNexus: true, x: 460, y: 180 },
    { id: "ip1", label: "IP: 103.21.58.14 (Delhi)", type: "ip", isNexus: true, x: 340, y: 210 },
    { id: "bank1", label: "HDFC Acc ...84921", type: "bank", isNexus: false, x: 260, y: 80 }
  ],
  links: [
    { source: "b2", target: "dir1", type: "COMMON_DIRECTOR", alert: true },
    { source: "b3", target: "dir1", type: "SHADOW_DIRECTOR", alert: true },
    { source: "b2", target: "ip1", type: "SAME_BID_SUBNET", alert: true },
    { source: "b3", target: "ip1", type: "SAME_BID_SUBNET", alert: true },
    { source: "b2", target: "bank1", type: "BANK_ACCOUNT", alert: false }
  ]
};
