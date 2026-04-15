import React from "react";

type Props = {
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaLink?: string;
  image: { url: string; alt: string };
  imagePosition?: "left" | "right";
};

export const SplitImageTextBlock: React.FC<Props> = ({
  heading,
  body,
  ctaLabel,
  ctaLink,
  image,
  imagePosition = "right",
}) => {
  return (
    <section className={`split-image-text split-image-text--image-${imagePosition}`}>
      <div className="split-image-text__inner">
        <div className="split-image-text__content">
          <h2>{heading}</h2>
          <p>{body}</p>
          {ctaLabel && ctaLink && (
            <a href={ctaLink} className="split-image-text__cta">
              {ctaLabel} →
            </a>
          )}
        </div>
        <div className="split-image-text__media">
          <img src={image.url} alt={image.alt} loading="lazy" />
        </div>
      </div>
    </section>
  );
};
