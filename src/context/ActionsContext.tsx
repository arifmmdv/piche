import { createContext, ReactNode, useContext, useState } from "react";

import type { ActionType } from "../types/Action.ts";

interface ActionContextValue {
  actions: ActionType[];
  setActions: (actions: ActionType[]) => void;
}

const ActionContext = createContext<ActionContextValue | undefined>(undefined);

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error("usePostContext must be used within a ActionProvider");
  }
  return context;
};

export const ActionsProvider= ({ children } : {
  children: ReactNode
}) => {
  const [actions, setActions] = useState<ActionType[]>([]);

  const value: ActionContextValue = {
    actions,
    setActions,
  };

  return <ActionContext.Provider value={value}>{children}</ActionContext.Provider>;
};