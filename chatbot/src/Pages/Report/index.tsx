import React, { useEffect } from "react";
import Table from "../../Components/Table";
import { TableCell, TableRow, Text } from "@tremor/react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getStatistics } from "../../slices/statsSlice";

const Report: React.FC = () => {
  const dispatch = useAppDispatch();
  const reports = useAppSelector((state) => state.report.reports);

  useEffect(() => {
    dispatch(getStatistics());
  }, []);
  const headers = [
    "Firstname",
    "Lastname",
    "Phonenumber",
    "Gender",
    "Incident",
  ];
  const generateTableData = () => {
    return (
      reports?.incidents.map((incident) => (
        <TableRow key={incident._id}>
          <TableCell className="text-white">{incident.firstname}</TableCell>
          <TableCell className="text-white">{incident.lastname}</TableCell>
          <TableCell>
            <Text className="text-white">{incident.phonenumber}</Text>
          </TableCell>
          <TableCell>
            <Text className="text-white">{incident.gender}</Text>
          </TableCell>
          <TableCell>
            <Text className="text-white">{incident.incident}</Text>
          </TableCell>
        </TableRow>
      )) || []
    );
  };

  return (
    <div className=" bg-primary flex  flex-col  py-10 ">
      <Table
        name="Reported Cases"
        headers={headers}
        data={generateTableData()}
      />
    </div>
  );
};

export default Report;
