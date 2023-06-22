import * as React from "react";
import { Checkbox, ImageList } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import AddTask from "./AddTask";
import { generateRandomId } from "../helper";

export default function Board(props) {
  const { board, boards, setBoards, activeBoard } = props;
  const [tasks, setTasks] = useState({});

  const [selectedTasks, setSelectedTasks] = useState({});

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
      let cloneData = JSON.parse(JSON.stringify(selectedTasks[columnKey]));
      const index = cloneData.indexOf(value);
      if (index !== -1) {
        cloneData.splice(index, 1);
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

  return (
    <div className="boardContainer">
      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fit, minmax(30%,1fr)) !important",
          gridAutoColumns: "minmax(240px, 1fr)",
          gap: "25px",
        }}
        className={"boxCon"}
      >
        {board?.columns.map((cdata) => (
          <div className="taskBasedContainer" id={cdata.key} key={cdata.key}>
            <div className="columnTitle">{cdata.title}</div>
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
