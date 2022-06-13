import React from "react";

const Home: React.FC<Record<string, never>> = () => {
  return (
    <div className="h-full w-full px-12">
      <div className="flex items-center justify-center space-x-16 py-40 h-full">
        <div className="rounded-xl bg-gat-gray h-full w-1/3"></div>
        <div className="rounded-xl bg-gat-gray h-full w-1/3"></div>
        <div className="rounded-xl bg-gat-gray h-full w-1/3"></div>
      </div>
    </div>
  );
};

export default Home;
