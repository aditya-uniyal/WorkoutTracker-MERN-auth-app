import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  // this context var holds the value prop of the WorkoutsContext.Provider component. -- {state, dispatch}
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
