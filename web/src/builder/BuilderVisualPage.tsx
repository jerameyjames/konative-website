"use client";

import type { BuilderContent } from "@builder.io/sdk";
import { builder } from "@builder.io/sdk";
import { Builder, BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { useEffect, useState } from "react";

import { CTABandBlock } from "../blocks/CTABand/Component";
import { HeroRotatingBlock } from "../blocks/HeroRotating/Component";
import { LatestNewsFeedBlock } from "../blocks/LatestNewsFeed/Component";
import { SplitImageTextBlock } from "../blocks/SplitImageText/Component";
import { StatBarBlock } from "../blocks/StatBar/Component";
import { ThreeCardGridBlock } from "../blocks/ThreeCardGrid/Component";

let registered = false;

function registerKonativeBlocks() {
  if (registered) return;
  registered = true;

  Builder.registerComponent(HeroRotatingBlock, {
    name: "HeroRotating",
    friendlyName: "Hero rotating",
    inputs: [
      { name: "headline", type: "string", defaultValue: "Navigate" },
      {
        name: "rotatingWords",
        type: "list",
        subFields: [{ name: "word", type: "string" }],
        defaultValue: [{ word: "Power" }, { word: "Connectivity" }],
      },
      { name: "subtitle", type: "longText" },
      { name: "ctaLabel", type: "string", defaultValue: "Contact" },
      { name: "ctaLink", type: "string", defaultValue: "/contact" },
      {
        name: "backgroundImage",
        type: "object",
        subFields: [
          { name: "url", type: "string", helperText: "Full image URL (https). Leave empty for default datacenter photo." },
          { name: "alt", type: "string", helperText: "Short description for accessibility" },
        ],
      },
    ],
  });

  Builder.registerComponent(ThreeCardGridBlock, {
    name: "ThreeCardGrid",
    friendlyName: "Three card grid",
    inputs: [
      { name: "sectionTitle", type: "string" },
      {
        name: "cards",
        type: "list",
        subFields: [
          { name: "title", type: "string" },
          { name: "description", type: "longText" },
          { name: "linkLabel", type: "string" },
          { name: "linkUrl", type: "string" },
          {
            name: "image",
            type: "object",
            subFields: [
              { name: "url", type: "string" },
              { name: "alt", type: "string" },
            ],
          },
        ],
      },
    ],
  });

  Builder.registerComponent(StatBarBlock, {
    name: "StatBar",
    friendlyName: "Stat bar",
    inputs: [
      {
        name: "stats",
        type: "list",
        subFields: [
          { name: "value", type: "string" },
          { name: "label", type: "string" },
        ],
      },
    ],
  });

  Builder.registerComponent(SplitImageTextBlock, {
    name: "SplitImageText",
    friendlyName: "Split image / text",
    inputs: [
      { name: "heading", type: "string" },
      { name: "body", type: "longText" },
      { name: "ctaLabel", type: "string" },
      { name: "ctaLink", type: "string" },
      {
        name: "image",
        type: "object",
        subFields: [
          { name: "url", type: "string" },
          { name: "alt", type: "string" },
        ],
      },
      {
        name: "imagePosition",
        type: "string",
        enum: ["left", "right"],
        defaultValue: "right",
      },
    ],
  });

  Builder.registerComponent(CTABandBlock, {
    name: "CTABand",
    friendlyName: "CTA band",
    inputs: [
      { name: "heading", type: "string" },
      { name: "ctaLabel", type: "string" },
      { name: "ctaLink", type: "string" },
      {
        name: "style",
        type: "string",
        enum: ["primary", "warm", "neutral"],
        defaultValue: "primary",
      },
    ],
  });

  Builder.registerComponent(LatestNewsFeedBlock, {
    name: "LatestNewsFeed",
    friendlyName: "Latest news feed",
    inputs: [
      { name: "heading", type: "string", defaultValue: "Latest intelligence" },
      { name: "intro", type: "longText" },
      { name: "maxItems", type: "number", defaultValue: 6 },
      {
        name: "countryFilter",
        type: "string",
        enum: ["all", "us", "ca"],
        defaultValue: "all",
      },
      { name: "showSource", type: "boolean", defaultValue: true },
      { name: "showPublishedDate", type: "boolean", defaultValue: true },
      { name: "ctaLabel", type: "string" },
      { name: "ctaLink", type: "string" },
    ],
  });
}

function BuilderCanvas({
  urlPath,
  initialContent,
}: {
  urlPath: string;
  /** `undefined` = client-only fetch; `null` = server found no entry (show empty unless visual preview). */
  initialContent?: BuilderContent | null;
}) {
  const isPreviewing = useIsPreviewing();
  const ssrTried = initialContent !== undefined;

  if (ssrTried && initialContent === null && !isPreviewing) {
    return (
      <div style={{ padding: "2rem", fontFamily: "system-ui", maxWidth: "40rem" }}>
        <p>
          No published Builder content for <code>{urlPath || "/"}</code> (model <code>page</code>). Create or publish a
          page in Builder.io, or open this URL in the visual editor to work on drafts.
        </p>
      </div>
    );
  }

  return (
    <BuilderComponent
      model="page"
      url={urlPath || "/"}
      content={initialContent === undefined ? undefined : initialContent ?? undefined}
    />
  );
}

export function BuilderVisualPage({
  urlPath,
  initialContent,
}: {
  urlPath: string;
  /** From server `getBuilderPageContent` — set on Vercel for SSR; omit for legacy client-only fetch. */
  initialContent?: BuilderContent | null;
}) {
  const [ready, setReady] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

  useEffect(() => {
    if (!apiKey) return;
    builder.init(apiKey);
    registerKonativeBlocks();
    setReady(true);
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
        <p>
          Set <code>NEXT_PUBLIC_BUILDER_API_KEY</code> to render Builder.io pages at this route (model name{" "}
          <code>page</code>).
        </p>
      </div>
    );
  }

  if (!ready) return null;

  return <BuilderCanvas urlPath={urlPath} initialContent={initialContent} />;
}
