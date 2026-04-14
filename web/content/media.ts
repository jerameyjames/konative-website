/**
 * Placeholder photography — modular / edge / power / diligence mood.
 * Replace with licensed or owned assets before final brand lock.
 */
export const stitchImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80",
    alt: "Rows of server cabinets in a data hall, cool-toned lighting",
  },
  playbook: {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    alt: "Spreadsheets and laptop on a desk during a planning session",
  },
  problem: {
    src: "https://images.unsplash.com/photo-1581091226035-d5220b8e0429?auto=format&fit=crop&w=1600&q=80",
    alt: "Engineer reviewing equipment in an industrial environment",
  },
  segmentsInvestors: {
    src: "https://images.unsplash.com/photo-1532601224476-f630e42fdfc8?auto=format&fit=crop&w=1200&q=80",
    alt: "Team collaborating around a conference table with documents",
  },
  segmentsIdc: {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    alt: "Wide landscape with fields and distant horizon at dusk",
  },
  segmentsInfra: {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    alt: "High-voltage transmission lines against a dramatic sky",
  },
  services: {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    alt: "Architectural drawings and ruler on a desk",
  },
  compare: {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    alt: "Close-up of network cables and patch panels",
  },
  engagement: {
    src: "https://images.unsplash.com/photo-1487057474241-69010c44a34a?auto=format&fit=crop&w=1600&q=80",
    alt: "Laptop on a desk with code and notes, shallow depth of field",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1451188506771-88d7c826ac22?auto=format&fit=crop&w=1600&q=80",
    alt: "Illuminated digital globe representing connected infrastructure",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    alt: "Two colleagues talking in a bright modern office",
  },
  explorePower: {
    src: "https://images.unsplash.com/photo-1466611653911-95061537f713?auto=format&fit=crop&w=1200&q=80",
    alt: "Wind turbines on a ridge at sunset",
  },
  exploreCooling: {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    alt: "Abstract blue water surface suggesting cooling and flow",
  },
} as const;

export type StitchImageKey = keyof typeof stitchImages;
