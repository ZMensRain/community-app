import React, { createContext, ReactNode, useContext, useState } from "react";
import { Issue } from "../model/issue";

const IssueReportCreationContext = createContext<{
  state: [Issue, React.Dispatch<React.SetStateAction<Issue>>];
  onSubmit: () => void;
} | null>(null);

type props = { children: ReactNode; onSubmit: (value: Issue) => void };
const IssueReportCreationProvider = ({ children, onSubmit }: props) => {
  const state = useState<Issue>({
    coordinates: { latitude: 0, longitude: 0 },
    description: "",
    type: "",
  });
  return (
    <IssueReportCreationContext.Provider
      value={{ state: state, onSubmit: () => onSubmit(state[0]) }}
    >
      {children}
    </IssueReportCreationContext.Provider>
  );
};

const useIssueCreationContext = () => useContext(IssueReportCreationContext);

export { IssueReportCreationProvider, useIssueCreationContext };
