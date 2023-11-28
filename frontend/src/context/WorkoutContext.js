import { createContext, useReducer } from "react";

// create the context for other components to use
export const WorkoutsContext = createContext();

export const workoutsReducer = (prevState, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...prevState.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: prevState.workouts.filter(
          (workout) => workout._id !== action.payload._id // return false if we want to remove the workout from the new state.
        ),
      };
    default:
      return prevState;
  }
};

// the argument inside the dispatch function is called action.
// when we call this dispatch function, in turn our reducer function is invoked(workoutsReducer in this case).
// and it passes the action into the reducer function so that it can do its thing and update the state using that information and data.
// dispatch({type: '', payload: [ data -> {}, {}] });

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  // 2. provide that context to our application component tree so that components can access it.
  // You can do it by making a contextProvider component. It is going to be just a regular component that's going to wrap the rest of our application.

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
