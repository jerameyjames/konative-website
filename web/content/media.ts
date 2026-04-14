/**
 * Large-format architectural + hyperscale imagery (wide crops, high res).
 * Swap for owned / licensed plates when available.
 */
export const stitchImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2800&q=86",
    alt: "Wide data hall — cold aisle, depth, and hyperscale infrastructure",
  },
  playbook: {
    src: "https://images.unsplash.com/photo-1451188506771-88d7c826ac22?auto=format&fit=crop&w=2800&q=86",
    alt: "Illuminated globe network — compute geography, fiber, and orchestration metaphor",
  },
  problem: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2800&q=86",
    alt: "Tower cranes and structural steel — capex velocity and construction scale",
  },
  segmentsInvestors: {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=86",
    alt: "Trading floor screens — liquidity, risk, and real-time capital decisions",
  },
  segmentsIdc: {
    src: "https://images.unsplash.com/photo-1477958841997-03aae6c9b5a4?auto=format&fit=crop&w=2800&q=86",
    alt: "Modern glass towers at dusk — institutional scale and skyline capital",
  },
  segmentsInfra: {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2800&q=86",
    alt: "High-voltage transmission against sky — grid headroom and interconnection drama",
  },
  services: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ac?auto=format&fit=crop&w=2800&q=86",
    alt: "Pedestrians before mirrored towers — delivery organizations at city scale",
  },
  compare: {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2800&q=86",
    alt: "Dense fiber and copper harness — integration layer and physical interfaces",
  },
  engagement: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2800&q=86",
    alt: "Curved glass architecture in fog — flagship facilities and future-forward build",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1639322537504-6427daaa8b79?auto=format&fit=crop&w=2600&q=86",
    alt: "Abstract fluid light forms — precision surfaces and engineered optics",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f7d83?auto=format&fit=crop&w=2800&q=86",
    alt: "Glass curtain wall facade — arrival, credibility, and enterprise presence",
  },
  explorePower: {
    src: "https://images.unsplash.com/photo-1466611653911-95061537f713?auto=format&fit=crop&w=2800&q=86",
    alt: "Wind turbines on ridgeline — renewable coupling and power portfolio mix",
  },
  exploreCooling: {
    src: "https://images.unsplash.com/photo-1550751827-4bd863c31f0f?auto=format&fit=crop&w=2800&q=86",
    alt: "Server racks with blue LED paths — thermal load and operations telemetry",
  },
} as const;

export type StitchImageKey = keyof typeof stitchImages;
