import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [totalProgress, setTotalProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ totalProgress, setTotalProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }

  return context;
};
