import { defineField, defineType } from "sanity";

export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "source", type: "string" }),
    defineField({ name: "status", type: "string", options: { list: ["active", "unsubscribed"] }, initialValue: "active" }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "utmMedium", type: "string" }),
    defineField({ name: "subscribedAt", type: "datetime" }),
  ],
  preview: {
    select: { email: "email", source: "source", status: "status" },
    prepare({ email, source, status }: Record<string, string>) {
      return { title: email || "Unknown", subtitle: `${source || ""} · ${status || "active"}` };
    },
  },
});
