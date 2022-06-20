import React from "react";
import ChallengeCard from "../components/ChallengeCard";
import ChallengeData from "../data/ChallengeData";

const challengeCards = ChallengeData.map((item) => (
  <ChallengeCard
    key={item.id}
    category={item.category}
    level={item.level}
    description={item.description}
    reward={item.reward}
  />
));

const Challenges: React.FC<Record<string, never>> = () => {
  return (
    <div className="h-full w-full px-12">
      <div className="text-3xl font-bold text-center py-8 w-full">
        Time to Green<span className="text-gat-green">Act</span>!
      </div>
      <div className="flex flex-row flex-wrap items-start ">
        {challengeCards}
      </div>
    </div>
  );
};

export default Challenges;
