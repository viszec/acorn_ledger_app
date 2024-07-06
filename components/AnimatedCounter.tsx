// Add the "use client" directive at the top of your component file
"use client";

import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
      duration={2}
      decimals={2}
      decimal=","
      prefix="$"
      end={amount} />
    </div>
  );
};

export default AnimatedCounter;