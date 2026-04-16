import React from "react";
import { HeroRotatingBlock } from "../HeroRotating/Component";
import { ThreeCardGridBlock } from "../ThreeCardGrid/Component";
import { StatBarBlock } from "../StatBar/Component";
import { SplitImageTextBlock } from "../SplitImageText/Component";
import { CTABandBlock } from "../CTABand/Component";
import { LatestNewsFeedBlock } from "../LatestNewsFeed/Component";

const blockComponents: Record<string, React.FC<any>> = {
  "hero-rotating": HeroRotatingBlock,
  "three-card-grid": ThreeCardGridBlock,
  "stat-bar": StatBarBlock,
  "split-image-text": SplitImageTextBlock,
  "cta-band": CTABandBlock,
  "latest-news-feed": LatestNewsFeedBlock,
};

type Block = {
  blockType: string;
  [key: string]: unknown;
};

type NewsItem = {
  id: string | number;
  title?: string;
  url?: string;
  summary?: string;
  sourceName?: string;
  publishedAt?: string;
  countries?: string[];
};

export const RenderBlocks: React.FC<{ blocks: Block[]; newsItems?: NewsItem[] }> = ({
  blocks,
  newsItems = [],
}) => {
  if (!blocks) return null;
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType];
        if (!Component) return null;
        return <Component key={i} {...block} __newsItems={newsItems} />;
      })}
    </>
  );
};
