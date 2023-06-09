import * as React from "react";
import {
  Alert,
  Checkbox,
  IconButton,
  ImageList,
  Snackbar,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import AddTask from "./AddTask";
import { deepCopy, generateRandomId } from "../helper";
import DeleteIcon from "@mui/icons-material/Delete";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";
import SwipeLeftAltIcon from "@mui/icons-material/SwipeLeftAlt";

export default function Board(props) {
  const { board, boards, setBoards, activeBoard } = props;
  const [tasks, setTasks] = useState({});

  const [selectedTasks, setSelectedTasks] = useState({});
  const [barState, setBarState] = useState(false);

  const handleCheckBoxSelection = (event, columnKey) => {
    const prevTask =
      selectedTasks[columnKey] !== undefined ? selectedTasks[columnKey] : [];
    const value = event.target.value;

    if (event.target.checked) {
      setSelectedTasks({
        ...selectedTasks,
        [columnKey]: [...prevTask, value],
      });
    } else {
      let cloneData = deepCopy(selectedTasks[columnKey]); //JSON.parse(JSON.stringify(selectedTasks[columnKey]));
      const index = cloneData?.indexOf(value);
      if (index !== -1) {
        cloneData?.splice(index, 1);
        setSelectedTasks({
          ...selectedTasks,
          [columnKey]: cloneData,
        });
      }
    }
  };

  const renderTasks = (data, columnKey) => {
    if (data) {
      return Object.values(data)?.map((task) => {
        return (
          <div key={task.id} className="taskDetails">
            <div className="checkBox">
              <Checkbox
                value={task.id}
                onClick={(event) => handleCheckBoxSelection(event, columnKey)}
              />
            </div>
            <div className="task">{task.value}</div>
          </div>
        );
      });
    }
  };
  const constructData = (board) => {
    let disPdata = {};
    board?.columns?.forEach((column) => {
      Object.values(board?.tasks)?.forEach((task) => {
        if (task.status === column.key) {
          const prevTask =
            disPdata[column.key] !== undefined ? disPdata[column.key] : [];
          disPdata = {
            ...disPdata,
            [column.key]: [...prevTask, task],
          };
        }
      });
    });
    setTasks(disPdata);
  };

  useEffect(() => {
    if (board) constructData(board);
  }, [board]);

  const handleAdd = (text) => {
    const taskUid = generateRandomId(5);
    setBoards({
      ...boards,
      [board.key]: {
        ...boards[board.key],
        tasks: {
          ...boards[board.key].tasks,
          [taskUid]: {
            id: taskUid,
            value: text,
            status: "todo",
          },
        },
      },
    });
  };

  const handleDelete = (columnKey) => {
    let copiedSelectedTasks = deepCopy(selectedTasks);
    let copiedboards = deepCopy(boards);
    if (selectedTasks[columnKey]?.length > 0) {
      selectedTasks[columnKey].forEach((task) => {
        delete copiedboards?.[board.key]?.tasks?.[task];
      });
      setBoards(copiedboards);
      delete copiedSelectedTasks[columnKey];
      setSelectedTasks(copiedSelectedTasks);
    } else {
      setBarState(true);
    }
  };

  const handleMove = (data, position) => {
    let copiedSelectedTasks = deepCopy(selectedTasks);
    let copiedboards = deepCopy(boards);
    if (selectedTasks[data]?.length > 0) {
      const newColumnKey =
        boards[board.key]?.columns[
          boards[board.key]?.columns.findIndex(
            (column) => column.key === data
          ) + position
        ]?.key;
      selectedTasks[data].forEach((task) => {
        copiedboards[board.key].tasks[task].status = newColumnKey;
      });
      setBoards(copiedboards);
      delete copiedSelectedTasks[data];
      setSelectedTasks(copiedSelectedTasks);
    } else {
      setBarState(true);
    }
  };

  const renderControls = (data, index) => {
    return (
      <div className="controls">
        {index !== 0 && (
          <IconButton
            className="ControlLeftmove"
            onClick={() => handleMove(data.key, -1)}
          >
            <SwipeLeftAltIcon />
          </IconButton>
        )}
        <IconButton className="delete">
          <DeleteIcon onClick={() => handleDelete(data.key)} />
        </IconButton>
        {board?.columns?.length - 1 !== index && (
          <IconButton
            className="ControlRightmove"
            onClick={() => handleMove(data.key, 1)}
          >
            <SwipeRightAltIcon />
          </IconButton>
        )}
      </div>
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBarState(false);
  };

  return (
    <div className="boardContainer">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={barState}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Select atleast one tasks
        </Alert>
      </Snackbar>

      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fit, minmax(30%,1fr)) !important",
          gridAutoColumns: "minmax(240px, 1fr)",
          gap: "25px",
        }}
        className={"boxCon"}
      >
        {board?.columns.map((cdata, index) => (
          <div className="taskBasedContainer" id={cdata.key} key={cdata.key}>
            <div className="columnTitle">
              <h3>{cdata.title}</h3>
              {renderControls(cdata, index)}
            </div>
            <div className="tasksContainer">
              {renderTasks(tasks[cdata.key], cdata.key)}
            </div>
          </div>
        ))}
      </ImageList>
      {activeBoard && <AddTask handleAdd={handleAdd} />}
    </div>
  );
}
