import React from "react";
import ChallengeCard from "../components/ChallengeCard";
import Howitworks from "../components/Howitworks";
import ChallengeData from "../data/ChallengeData";

const challengeCards = ChallengeData.map((item) => (
  <ChallengeCard
    key={item.id}
    category={item.category}
    level={item.level}
    description={item.description}
    reward={item.reward}
    duration={item.duration}
  />
));

const Challenges: React.FC<Record<string, never>> = () => {
  return (
    <div>
      <div className="text-3xl font-bold text-center py-8">
        Time to Green<span className="text-gat-green">Act</span>!
      </div>
      <div className="flex flex-row h-full w-full">
        <Howitworks />
        <div className="w-[70%] flex flex-row flex-wrap items-start justify-center">
          {challengeCards}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
