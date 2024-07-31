import React from "react";
import { ProgressCircle } from "@tremor/react";
import { CardProps } from "../../myTypes";

const SentimentCard: React.FC<CardProps> = ({
  percentage,
  total,
  messages,
  name,
  color,
}) => {
  return (
    <div className="mx-auto relative w-full py-6 rounded-md px-4">
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle value={messages} size="md" color={color}>
          <span className="text-xs font-medium text-white">{percentage}%</span>
        </ProgressCircle>
        <div>
          <p className="text-white   font-medium">
            {messages}/{total} {percentage}%
          </p>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentimentCard;
