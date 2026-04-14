/**
 * Architectural + capital imagery — datacenter scale, liquidity, grid, diligence.
 * Licensed or owned photography should replace these before final brand lock.
 */
export const stitchImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1565214947120-63e3721f7e40?auto=format&fit=crop&w=2000&q=82",
    alt: "Server aisle in a data hall with cool blue lighting and depth",
  },
  playbook: {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1800&q=82",
    alt: "Trading and analytics screens suggesting capital markets velocity",
  },
  problem: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=82",
    alt: "Major construction site with cranes — schedule and capex pressure",
  },
  segmentsInvestors: {
    src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1400&q=82",
    alt: "Stacks of coins — liquidity, deployment, and return on capital",
  },
  segmentsIdc: {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=82",
    alt: "Open landscape at dusk — long horizon lines and stewardship context",
  },
  segmentsInfra: {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=82",
    alt: "Electrical switchgear and engineering work on high-voltage infrastructure",
  },
  services: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ac?auto=format&fit=crop&w=1800&q=82",
    alt: "Corporate towers at dusk — institutional capital and delivery scale",
  },
  compare: {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1800&q=82",
    alt: "Fiber and copper network cabling — integration and interfaces",
  },
  engagement: {
    src: "https://images.unsplash.com/photo-1554224154-22dec7ec8813?auto=format&fit=crop&w=1800&q=82",
    alt: "Executive table with laptops — diligence workshop and decisions",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1610374792793-78e5fd0b929a?auto=format&fit=crop&w=1800&q=82",
    alt: "Gold-toned abstract metal texture — value, reserves, and seriousness",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f7d83?auto=format&fit=crop&w=1800&q=82",
    alt: "Modern glass office facade — institutional arrival and credibility",
  },
  explorePower: {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=82",
    alt: "Transmission lines against sky — interconnection and MW headroom",
  },
  exploreCooling: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=82",
    alt: "Data center cabinets — thermal load and operations reality",
  },
} as const;

export type StitchImageKey = keyof typeof stitchImages;
