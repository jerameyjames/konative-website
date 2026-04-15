import React from "react";

type Props = {
  headline: string;
  rotatingWords: { word: string }[];
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
  backgroundImage?: { url: string; alt: string };
};

export const HeroRotatingBlock: React.FC<Props> = ({
  headline,
  rotatingWords,
  subtitle,
  ctaLabel,
  ctaLink,
}) => {
  return (
    <section className="hero-rotating">
      <div className="hero-rotating__inner">
        <h1 className="hero-rotating__headline">
          {headline}{" "}
          <span className="hero-rotating__accent" data-words={JSON.stringify(rotatingWords.map((w) => w.word))}>
            {rotatingWords[0]?.word}
          </span>
        </h1>
        {subtitle && <p className="hero-rotating__subtitle">{subtitle}</p>}
        {ctaLabel && ctaLink && (
          <a href={ctaLink} className="hero-rotating__cta">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
};
