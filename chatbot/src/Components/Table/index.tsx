import React from "react";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

import { TableProps } from "../../myTypes";

const Table: React.FC<TableProps> = ({ name, data, headers }) => {
  return (
    <div className="relative  flex flex-col border border-white border-opacity-10  p-[15px] rounded-md  w-full md:h-[50vh]  h-auto ">
      <Title className="text-white">{name}</Title>
      <div className="absolute topline right-0 top-0 h-px w-[200px]"></div>

      <TableComponent className="mt-5">
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <TableHeaderCell>
                <p className="text-grey">{item}</p>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{data}</TableBody>
      </TableComponent>
    </div>
  );
};

export default Table;
