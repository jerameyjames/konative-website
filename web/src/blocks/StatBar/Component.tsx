import React from "react";

type Stat = { value: string; label: string };
type Props = { stats: Stat[] };

export const StatBarBlock: React.FC<Props> = ({ stats }) => {
  return (
    <section className="stat-bar">
      <div className="stat-bar__inner">
        {stats?.map((stat, i) => (
          <div key={i} className="stat-bar__item">
            <span className="stat-bar__value">{stat.value}</span>
            <span className="stat-bar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
