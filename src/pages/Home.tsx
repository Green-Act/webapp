import React from "react";

const Home: React.FC<Record<string, never>> = () => {
  return (
    <div className="h-[calc(100%-64px)] w-full">
      <div className="flex items-center justify-center space-x-16 py-40 px-20 h-full">
        <div className="rounded-xl bg-gat-gray h-full w-1/3"></div>
        <div className="rounded-xl bg-gat-gray h-full w-1/3"></div>
        <div className="rounded-xl bg-gat-gray h-full w-1/3"></div>
      </div>
    </div>
  );
};

export default Home;
