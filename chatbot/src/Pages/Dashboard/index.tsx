import React, { useEffect } from "react";
import Chart from "../../Components/BarGraph";
import SentimentalAnalysis from "../../Components/SentimentalAnalysis";
import Table from "../../Components/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getStatistics } from "../../slices/statsSlice";
import { FiMoreVertical } from "react-icons/fi";
import { TableCell, TableRow, Text } from "@tremor/react";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const reports = useAppSelector((state) => state.report.reports);

  useEffect(() => {
    dispatch(getStatistics());
  }, []);
  const generateTableData = () => {
    return (
      reports?.users?.map((user) => (
        <TableRow key={user.firstname + " " + user.lastname}>
          <TableCell className="text-white">
            {user.firstname + " " + user.lastname}
          </TableCell>
          <TableCell>
            <Text className="text-white">{user.email}</Text>
          </TableCell>
        </TableRow>
      )) || []
    );
  };

  const headers = ["Name", "Email"];
  return (
    <div className="min-h-screen bg-primary flex  flex-col  py-10 ">
      <div className=" flex  md:flex-row flex-col  gap-4">
        <div className="flex flex-col justify-start items-start md:w-[60%] gap-4">
          <p className="text-white text-4xl font-bold">Dashboard</p>
          <p className="text-white">
            Get a quick overview of myLawyer AI app usage
          </p>
          <Chart />
        </div>
        <div className="flex flex-col justify-start items-start md:w-[40%] md:py-24 py-8">
          <SentimentalAnalysis />
        </div>
      </div>
      <Table name="Users" data={generateTableData()} headers={headers} />
    </div>
  );
};

export default Dashboard;
