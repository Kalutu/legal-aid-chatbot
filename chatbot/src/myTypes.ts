import React from "react";

export interface User {
    firstname: string;
    lastname: string;
    email:string;
    accounttype:string,
    isAdmin: boolean;
    chatId:string
  }

  export interface ChartDataItem {
    date: string;
    "Reported Cases ": number;
    "Users ": number;
    "Messages ": number;
  }
  export interface CardProps {
    percentage: number;
    total: number;
    messages: number;
    name: string;
    color: string;
  }
  export interface SideBarItem {
    /** The text to display inside the button */
    id: number;
    title: string;
    icon: any;
    link: string;
    hidden:boolean
    /** Whether the button can be interacted with */
  }
 export type Message = {
 
    message:string,
    sender:string,
    chatId:string,
  }
  export type HeaderProps = {
    action: () => void;
  };
  
  
  export interface TableProps  {
    name: string;
    data:JSX.Element[] ,
    headers:string[],
  }
 export  interface ComponentProps {
  /** The text to display inside the button */
  item: { id: number; link: string; icon: any; title: string,hidden:boolean };

  /** Whether the button can be interacted with */
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export type Messages ={

    sender: string;
    message: string;
};

export type ReportedCase = {
  firstname:string,
  lastname:string,
  phonenumber:string
  gender:string,
  incident:string,
}
export type Report = {
  ReportedCases: string;
  Messages: string;
  Users: User[];
  Date: string;
};
export type Incident = {
 _id: string;
  firstname: string;
  lastname: string;
  phonenumber:number,
  gender:string,
  incident: string;
 
};

export type messagesData= { 
sentiment:string,
percentage:number,
count:number

}

export type Reports = {
  dailyStats: Report[];
  messagesData:messagesData[];
  totalMessages:number;
  incidents:Incident[],
  users:User[],

  
};



export type ReportsApiState = {
  reports?:  Reports|null;
  report:Report|null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};
