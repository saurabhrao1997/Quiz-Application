import React from "react";
const Loader = () => {
  let circleCommonClasses = "h-2.5 w-2.5 bg-current rounded-full";
  let circle = "opacity-100 border-8 border-t-8 border-t-af-primary-main2 rounded-full w-32 h-32 animate-spin";
  let img = "opacity-100 animate-reversespin ";

  return (
    <div className="flex flex-wrap h-full w-full justify-center z-[5]  items-center">
      <div style={{position:"fixed"}} className={`${circle}`}>
        {/* <img className={`${img}`} style={{position:"fixed"}}  src="/assets/Logo-black_icon.png"></img> */}
      </div>
    </div>
  );
};

export default Loader;