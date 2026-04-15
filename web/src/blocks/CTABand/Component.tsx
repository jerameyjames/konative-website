import React from "react";

type Props = {
  heading: string;
  ctaLabel?: string;
  ctaLink?: string;
  style?: "primary" | "warm" | "neutral";
};

export const CTABandBlock: React.FC<Props> = ({
  heading,
  ctaLabel,
  ctaLink,
  style = "primary",
}) => {
  return (
    <section className={`cta-band cta-band--${style}`}>
      <div className="cta-band__inner">
        <h2>{heading}</h2>
        {ctaLabel && ctaLink && (
          <a href={ctaLink} className="cta-band__button">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
};
