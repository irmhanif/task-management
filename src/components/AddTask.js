import { Box } from "@mui/material";
import React, { useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicOffIcon from "@mui/icons-material/MicOff";

function AddTask(props) {
  const { handleAdd } = props;
  const [text, setText] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (text !== "") {
        handleAdd(text);
        setText("");
      }
    }
  };
  return (
    <div className="addTask">
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <SentimentSatisfiedAltIcon
          sx={{ color: "#919191", marginLeft: "16px" }}
        />
        <AttachFileIcon sx={{ color: "#919191", marginLeft: "16px" }} />
        <input
          type="search"
          name="q"
          className="message-input w-full py-3 text-sm bg-gray-700 rounded-full pl-5 focus:outline-none"
          placeholder="Type a Task"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <MicOffIcon sx={{ color: "#919191", marginLeft: "16px" }} />
      </Box>
    </div>
  );
}

export default AddTask;
