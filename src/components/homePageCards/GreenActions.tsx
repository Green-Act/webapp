import React from "react";

const GreenActions: React.FC<Record<string, never>> = () => {
  const letsGreenAct = () => {
    console.log("Let's greenact");
  };
  return (
    <div className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-12 py-5">
      <h6 className="font-bold text-xl">
        My Green<span className="text-gat-green">Actions</span>
      </h6>
      <img src="/actions.png" className="h-[130px] my-4" />
      <div className="flex-1">
        <div className="text-xs text-center">
          <p>
            If you’ve already safely connected your bank accounts to GreenAct
            and chosen your GreenActivist, you can start playing!{" "}
          </p>

          <p className="mt-3">Complete GreenActions to earn tokens!</p>
        </div>
      </div>
      <button
        className="border border-gat-green w-full py-1 rounded-full font-bold text-xs disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        onClick={letsGreenAct}
      >
        Let&apos;s GreenAct
      </button>
    </div>
  );
};

export default GreenActions;
