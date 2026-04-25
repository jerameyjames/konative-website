import { defineField, defineType } from "sanity";

export const contactInquiry = defineType({
  name: "contactInquiry",
  title: "Contact Inquiry",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "organization", type: "string", validation: r => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "projectType", type: "string" }),
    defineField({ name: "projectStage", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "referralSource", type: "string" }),
    defineField({ name: "status", type: "string", options: { list: ["new", "contacted", "qualified", "dead"] }, initialValue: "new" }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { name: "name", org: "organization", status: "status" },
    prepare({ name, org, status }: Record<string, string>) {
      return { title: name || "Unknown", subtitle: `${org || ""} · ${status || "new"}` };
    },
  },
});
