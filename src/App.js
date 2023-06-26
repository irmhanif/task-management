import Header from "./components/Header";
import "./App.scss";
import "./index.css";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Context";
import Content from "./components/Content";

function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    };

    updateIsDesktop();

    window.addEventListener("resize", updateIsDesktop);

    return () => {
      window.removeEventListener("resize", updateIsDesktop);
    };
  }, []);

  const theme = useContext(AppContext);
  const darkMode = theme.state.darkMode;

  const [drawerState, setDrawerState] = useState(false);
  const [boards, setBoards] = useState({});

  const handleCollapse = () => {
    setDrawerState(!drawerState);
  };
  if (!isDesktop) {
    return <div className="deviceError">Please Access it in Desktop</div>;
  }
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
