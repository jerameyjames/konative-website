/**
 * Large-format architectural + hyperscale imagery (wide crops, high res).
 * Swap for owned / licensed plates when available.
 */
export const stitchImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2800&q=86",
    alt: "Hyperscale data hall — cold aisle, structured cable, and compute density",
  },
  playbook: {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2800&q=86",
    alt: "Printed circuit and silicon — systems integration and disciplined engineering",
  },
  problem: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2800&q=86",
    alt: "Tower cranes and structural steel — capex velocity and delivery risk",
  },
  segmentsInvestors: {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=86",
    alt: "Capital markets screens — liquidity, risk, and IC-grade decisions",
  },
  segmentsIdc: {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed42abe?auto=format&fit=crop&w=2800&q=86",
    alt: "Open land at golden hour — site opportunity, stewardship, and long-term development",
  },
  segmentsInfra: {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2800&q=86",
    alt: "High-voltage transmission — grid headroom, upgrades, and interconnection reality",
  },
  services: {
    src: "https://images.unsplash.com/photo-1613665813440-6236e114eb59?auto=format&fit=crop&w=2800&q=86",
    alt: "Server racks and aisle containment — operations physics behind MW commitments",
  },
  compare: {
    src: "https://images.unsplash.com/photo-1556761175-b41309bf0723?auto=format&fit=crop&w=2800&q=86",
    alt: "Executive working session — alignment, tradeoffs, and documented decisions",
  },
  engagement: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2800&q=86",
    alt: "Modern workspace architecture — flagship delivery and executive readouts",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1639762681488-632b975e9460?auto=format&fit=crop&w=2600&q=86",
    alt: "Dark abstract data visualization — precision, measurement, and governance",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2800&q=86",
    alt: "Focused collaboration — fit, sequencing, and next commitments",
  },
  marketWindow: {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2800&q=86",
    alt: "Electrical switchyard — where MW contracts meet steel and schedule",
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
