import { BarChart, Title } from "@tremor/react";
import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()}`;

const Chart: React.FC = () => {
  const report = useAppSelector((state) => state.report.reports);
  console.log(report);

  return (
    <div className="relative b flex flex-col border border-white border-opacity-10  p-[15px] rounded-md  w-full md:h-[50vh]  h-auto ">
      <Title className="text-white">Overview</Title>
      <div className="absolute topline right-0 top-0 h-px w-[200px]"></div>

      <BarChart
        className="mt-10 "
        yAxisWidth={48}
        data={report && report.dailyStats ? report.dailyStats : []}
        index="date"
        categories={["messageCount", "reportCount", "userCount"]}
        colors={["sky", "indigo", "lime", "sky"]}
        valueFormatter={valueFormatter}
      />
    </div>
  );
};

export default Chart;
