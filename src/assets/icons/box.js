import * as React from "react";
import ArrowIcon from "./arrow";

const Box = (props) => (
  <div className="bg-primary bg-[#64CFF6] w-[70px] h-[70px] mb-[150px] relative rounded">
    <div className="absolute top-1/4 left-[10px] translate-x-[10%] translate-y-[20%]">
      <ArrowIcon />
    </div>
  </div>
);

export default Box;
