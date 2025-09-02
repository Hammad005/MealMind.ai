import React from "react";
import FuzzyText from "./ui/FuzzyText";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center">
      <FuzzyText
        baseIntensity={0.1}
        hoverIntensity={0.2}
        enableHover={true}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.1}
        hoverIntensity={0.2}
        enableHover={true}
        fontSize="30px"
      >
        Page Not Found
      </FuzzyText>
    </div>
  );
};

export default NotFound;
