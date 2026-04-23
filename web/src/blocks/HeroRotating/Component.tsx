import React from "react";

/** Matches legacy `HeroSection` default — datacenter imagery. */
export const DEFAULT_HERO_BACKGROUND_URL =
  "https://www.adventuresincre.com/wp-content/uploads/2025/06/An-external-view-of-a-hyperscale-modern-data-center-building-1210x423.jpg";

type Props = {
  headline: string;
  rotatingWords: { word: string }[];
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
  /** Optional; when absent, `DEFAULT_HERO_BACKGROUND_URL` is used so the Builder homepage always has a photo hero. */
  backgroundImage?: { url: string; alt?: string };
};

function heroBackgroundUrl(image: Props["backgroundImage"]): string {
  const raw = image?.url?.trim();
  if (raw) return raw;
  return DEFAULT_HERO_BACKGROUND_URL;
}

export const HeroRotatingBlock: React.FC<Props> = ({
  headline,
  rotatingWords,
  subtitle,
  ctaLabel,
  ctaLink,
  backgroundImage,
}) => {
  const bgUrl = heroBackgroundUrl(backgroundImage);
  const bgLabel = backgroundImage?.alt?.trim() || "Hero background";

  return (
    <section className="hero-rotating" aria-label="Hero">
      <div
        className="hero-rotating__bg"
        style={{ backgroundImage: `url(${JSON.stringify(bgUrl)})` }}
        role="img"
        aria-label={bgLabel}
      />
      <div className="hero-rotating__scrim" aria-hidden />
      <div className="hero-rotating__inner">
        <h1 className="hero-rotating__headline">
          {headline}{" "}
          <span
            className="hero-rotating__accent"
            data-words={JSON.stringify(rotatingWords.map((w) => w.word))}
          >
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
