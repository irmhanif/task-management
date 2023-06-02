import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Board from "./Board";
import Navbar from "./Navbar";
import { IconButton } from "@mui/material";
import TransitionsModal from "../common/Modal";

export default function Content(props) {
  const {
    drawerState
  } = props;
  const [boards, setBoards] = useState([
    "Inbox",
    "Starred",
    "Send email",
    "Drafts",
  ])
  const createBoard =(value) => {
    setBoards([...boards, value])
  }
  return (
    <Box
      sx={{ display: "flex", width: "100%", position: "relative" }}
      className="content"
    >
      <CssBaseline />

      <div
        className="mt-4 navBarParent"
        style={
          drawerState
            ? { transform: "translate(-100%, 0)" }
            : {}
        }
      >
      <TransitionsModal 
        btnAction={createBoard}
        />

        <Navbar
        boards={boards}
        setBoards={setBoards}
        />
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
