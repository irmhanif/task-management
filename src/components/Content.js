import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Board from "./Board";
import Navbar from "./Navbar";
import { Button, IconButton, Input } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { defaultColumns, generateRandomId, getLocalStorage, setLocalStorage } from "../helper";
import { useEffect } from "react";

export default function Content(props) {
  const { drawerState } = props;
  
  const [boards, setBoards] = useState({});

  const [addBox, setAddBox] = useState(false);
  const [boardValue, setBoardValue] = useState("");
  const [activeBoard, setActiveBoard] = useState(
    boards?.[Object?.keys(boards)[0]]?.key
  );
  const handleAddInput = () => {
    setAddBox(!addBox);
  };
  const handleAddBoard = () => {
    const uniqId = generateRandomId(8);
    setBoards({
      [uniqId]: {
        title: boardValue,
        key: uniqId,
        columns: defaultColumns,
        tasks: {}
      },
      ...boards
    });
    handleAddInput();
    setBoardValue("");
    setActiveBoard(uniqId)
  };


  useEffect(()=> {
    let taskList = getLocalStorage('tasks')
    setBoards(taskList)
    setActiveBoard(taskList?.[Object?.keys(taskList)[0]]?.key)
  }, [])

  useEffect(()=> {
    if(boards && Object?.keys(boards)?.length>0) {
      setLocalStorage('tasks', boards)
    }
  }, [boards])

  return (
    <Box
      sx={{ display: "flex", width: "100%", position: "relative" }}
      className="content"
    >
      <CssBaseline />

      <div
        className="mt-4 navBarParent"
        style={drawerState ? { transform: "translate(-100%, 0)" } : {}}
      >
        <Button variant="contained" className="mx-1" onClick={handleAddInput}>
          + Add New Board
        </Button>
        {addBox && (
          <>
            <div className="addItem">
              <Input
                className="addInput"
                value={boardValue}
                onChange={(e) => {
                  setBoardValue(e.target.value);
                }}
              />
              <IconButton aria-label="submit" onClick={handleAddBoard}>
                <CheckBoxIcon />
              </IconButton>
              <IconButton aria-label="cancel" onClick={handleAddInput}>
                <CancelIcon />
              </IconButton>
            </div>
          </>
        )}
        <Navbar
          boards={boards}
          setBoards={setBoards}
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
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
        sx={{ flexGrow: 1, p: 3, pb: 0 }}
      >
        <Board boards={boards} board={boards?.[activeBoard]} setBoards={setBoards} activeBoard={activeBoard}/>
      </Box>
    </Box>
  );
}
