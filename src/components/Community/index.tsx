import React, { type FC, useEffect, useState, useMemo } from "react";
import "./LandingCommunity.css";
import { useCommunityStatsContext } from "@site/src/lib/statsProvider";

type Props = {
  className?: string;
};

export const LandingCommunity: FC<Props> = ({ className }) => {
  const { githubStarCountText, githubContributorsCount, githubForksCount } = useCommunityStatsContext();
  const [state, setState] = useState({
    stat0: 0,
    stat1: 0,
    stat2: 0,
    stat3: 0,
  });

  const generateList = useMemo(() => [
    {
      stat: githubStarCountText,
      description: "Stars on our GitHub repository, showcase the  support and contribution, we recieved from the community.",
      href: "https://github.com/recodehive",
      // https://github.com/CodeHarborHub/codeharborhub.github.io/stargazers
    },
    {
      stat: 20,
      description: "Live projects on recodehive, demonstrating the power of open-source collaboration.",
    },
    {
      stat: githubContributorsCount,
      description: "List of Contributors who have made our repository better.",
      href: "https://github.com/recodehive",
      // https://github.com/CodeHarborHub/codeharborhub.github.io/graphs/contributors
    },
    {
      stat: githubForksCount,
      description: "Forks of our repository, showing how our community extends our work.",
      href: "https://github.com/recodehive",

      //https://github.com/CodeHarborHub/codeharborhub.github.io/network/members
    },
  ], [githubStarCountText, githubContributorsCount, githubForksCount]);

  const handleDynamicChange = (target: number, index: number) => {
    let count = 0;
    const increment = target / 100;
    const interval = setInterval(() => {
      count += increment;
      setState(prev => ({ ...prev, [`stat${index}`]: Math.round(count) }));
      if (count >= target) {
        setState(prev => ({ ...prev, [`stat${index}`]: target }));
        clearInterval(interval);
      }
    }, 20);
  };

  useEffect(() => {
    generateList.forEach((item, index) => {
      handleDynamicChange(Number(item.stat), index);
    });
  }, [generateList]);

  return (
    <div className={`landing-community ${className || ""}`}>
      <div className="landing-community__header">
        <h2 className="landing-community__title">
          Discover the strength of our{" "}
          <span className="landing-community__highlight">amazing community</span>.
        </h2>
      </div>

      <div className="landing-community__content">
        <div className="landing-community__stats">
          {generateList.map((item, index) => (
            <span key={index} className="landing-community__stat-item">
              <div className="landing-community__stat-value">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${state[`stat${index}`]}${index !== 1 ? "" : ""}`}
                  </a>
                ) : (
                  `${state[`stat${index}`]}`
                )}
              </div>
              <div className="landing-community__stat-description">
                {item.description}
              </div>
            </span>
          ))}
        </div>

        <div className="landing-community__info">
          <img
            className="landing-community__image"
            src="/community.png"
            alt="team collaboration"
            loading="lazy"
          />
          <div className="landing-community__info-text">
            Our developers are the core of Hive community. We take pride in
            our{" "}
            <a
              href="https://github.com/recodehive"
              //https://github.com/CodeHarborHub/codeharborhub.github.io/graphs/contributors
              target="_blank"
              rel="noopener noreferrer"
              className="landing-community__link"
            >
              GitHub community
            </a>{" "}
            with over{" "}
            <a
              href="https://github.com/recodehive"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-community__link"
            >
              500+ contributors
            </a>{" "}
            powering recodehive.
          </div>
        </div>
      </div>
    </div>
  );
};
