import React from "react";

type Card = {
  title: string;
  description?: string;
  linkLabel?: string;
  linkUrl?: string;
  image?: { url: string; alt: string };
};

type Props = {
  sectionTitle?: string;
  cards: Card[];
};

export const ThreeCardGridBlock: React.FC<Props> = ({ sectionTitle, cards }) => {
  return (
    <section className="three-card-grid">
      <div className="three-card-grid__inner">
        {sectionTitle && <h2 className="three-card-grid__title">{sectionTitle}</h2>}
        <div className="three-card-grid__cards">
          {cards?.map((card, i) => (
            <div key={i} className="three-card-grid__card">
              {card.image && (
                <img src={card.image.url} alt={card.image.alt} loading="lazy" />
              )}
              <h3>{card.title}</h3>
              {card.description && <p>{card.description}</p>}
              {card.linkUrl && (
                <a href={card.linkUrl}>{card.linkLabel || "Learn More"} →</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
