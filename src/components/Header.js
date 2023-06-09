import React, { useContext } from "react";
import Title from "../common/Title";
import IconButton from "@mui/material/IconButton";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppContext } from "../Context";

function Header(props) {
  const theme = useContext(AppContext);
  const { darkMode } = theme.state;
  const onClick = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };
  return (
    <header className="p-4 w-100 d-flex justify-content-between header">
      <div className="d-flex justify-content-between row w-50">
        <div className="d-flex col-md-6">
          {/* <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          onClick={handleCollapse}
        >
          <MenuIcon className="navIcon" />
        </IconButton> */}
          <Title value={"Task Management"} />
        </div>
        {/* <div className="d-flex col-md-6">
          <Title variant={"h6"} value={"Page Name"} />
        </div> */}
      </div>

      <div className="d-flex justify-content-between">
        <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
          {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
