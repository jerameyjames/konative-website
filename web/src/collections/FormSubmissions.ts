import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "organization", "projectType", "createdAt"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "organization", type: "text", required: true },
    { name: "role", type: "text" },
    {
      name: "projectType",
      type: "select",
      options: [
        { label: "Modular Data Center Build", value: "modular_dc_build" },
        { label: "Connectivity / Fiber", value: "connectivity" },
        { label: "Tribal / Indigenous Development", value: "tribal_indigenous" },
        { label: "Market Intelligence Access", value: "market_intel" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "projectStage",
      type: "select",
      options: [
        { label: "Exploring (no site yet)", value: "exploring" },
        { label: "Site identified, power TBD", value: "site_identified" },
        { label: "Site + power, need connectivity", value: "need_connectivity" },
        { label: "Fully sited, need capital intro", value: "fully_sited" },
        { label: "Already in development", value: "in_development" },
      ],
    },
    { name: "message", type: "textarea" },
    { name: "referralSource", type: "text" },
  ],
};
