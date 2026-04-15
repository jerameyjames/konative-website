import React from "react";
import { HeroRotatingBlock } from "../HeroRotating/Component";
import { ThreeCardGridBlock } from "../ThreeCardGrid/Component";
import { StatBarBlock } from "../StatBar/Component";
import { SplitImageTextBlock } from "../SplitImageText/Component";
import { CTABandBlock } from "../CTABand/Component";

const blockComponents: Record<string, React.FC<any>> = {
  "hero-rotating": HeroRotatingBlock,
  "three-card-grid": ThreeCardGridBlock,
  "stat-bar": StatBarBlock,
  "split-image-text": SplitImageTextBlock,
  "cta-band": CTABandBlock,
};

type Block = {
  blockType: string;
  [key: string]: unknown;
};

export const RenderBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  if (!blocks) return null;
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType];
        if (!Component) return null;
        return <Component key={i} {...block} />;
      })}
    </>
  );
};
