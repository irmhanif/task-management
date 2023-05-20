import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Board from "./Board";
import Navbar from "./Navbar";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TransitionsModal from "../common/Modal";

export default function Content() {
  const [drawerState, setDrawerState] = React.useState(false);
  const handleCollapse = () => {
    setDrawerState(!drawerState);
  };
  return (
    <Box
      sx={{ display: "flex", width: "100%", position: "relative" }}
      className="content"
    >
      <CssBaseline />
      <div style={{ position: "absolute", top: "-40px", left: "12px" }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          onClick={handleCollapse}
        >
          <MenuIcon className="navIcon" />
        </IconButton>
      </div>

      <div
        className="mt-4 navBarParent"
        style={
          drawerState
            ? { transform: "translate(-100%, 0)" }
            : {}
        }
      >
      <TransitionsModal />

        <Navbar />
      </div>

      <Box
        component="main"
        style={
          drawerState
            ? { transform: "translate(-240px, 0)", overflow: "visible" }
            : {}
        }
        className="board"
        sx={{ flexGrow: 1, p: 3, pb:0 }}
      >
        <Board />
      </Box>
    </Box>
  );
}
