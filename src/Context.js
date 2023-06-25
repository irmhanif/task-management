import React, { createContext, useReducer } from "react";

const initialState = { darkMode: true, boards: {} };

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    case "ADD_BOARD":
      return { ...state, boards: { ...state.boards, payload } };
    default:
      return state;
  }
};

export const AppContext = createContext();

export function AppProvider(props) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
