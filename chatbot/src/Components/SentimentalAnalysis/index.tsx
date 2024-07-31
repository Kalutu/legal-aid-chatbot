import { Title } from "@tremor/react";
import React from "react";
import SentimentCard from "../SentimentCard";
import { useAppSelector } from "../../hooks/redux-hooks";

const SentimentalAnalysis: React.FC = () => {
  const reports = useAppSelector((state) => state.report.reports);

  return (
    <div className="relative b flex flex-col border border-white border-opacity-10  p-[15px] rounded-md  w-full md:h-[50vh]  h-auto ">
      <Title className="text-white">Messages Sentimental Analysis</Title>
      <div className="absolute topline right-0 top-0 h-px w-[200px]"></div>

      {reports &&
        reports.messagesData.map((report) => (
          <SentimentCard
            key={report.sentiment}
            name={report.sentiment}
            color=""
            messages={report.count ?? 0}
            total={reports.totalMessages}
            percentage={parseFloat(report.percentage.toFixed(2))}
          />
        ))}
    </div>
  );
};

export default SentimentalAnalysis;
