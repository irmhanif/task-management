import Header from "./components/Header";
import "./App.scss";
import "./index.css";
import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import Content from "./components/Content";

function App() {
  const theme = useContext(AppContext);
  const darkMode = theme.state.darkMode;

  const [drawerState, setDrawerState] = useState(false);
  const [boards, setBoards] = useState({});

  const handleCollapse = () => {
    setDrawerState(!drawerState);
  };

  return (
    <div className={`appContainer ${darkMode ? "dark" : "light"}`}>
      <Header handleCollapse={handleCollapse} />

      <Content
        drawerState={drawerState}
        boards={boards}
        setBoards={setBoards}
      />
    </div>
  );
}

export default App;
