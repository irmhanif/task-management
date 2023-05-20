import React, { useContext } from "react";
import Title from "../common/Title";
import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppContext } from "../Context";

function Header(props) {
  const theme = useContext(AppContext);

  const {darkMode, boards} = theme.state;
  console.log("boards ", boards);
  const onClick = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };
  return (
    <header className="p-4 w-100 d-flex justify-content-between header">
      <div className="d-flex justify-content-between row w-50">
        <div className="d-flex col-md-6">
          <Title value={"Task Management"} />
        </div>
        <div className="d-flex col-md-6">
          <Title variant={"h6"} value={"Page Name"} />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
          {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <Button variant="contained" className="mx-1">
          + Add New Task
        </Button>
        <Button variant="text" className="p-0">
          <MoreVertIcon />
        </Button>
      </div>
    </header>
  );
}

export default Header;
