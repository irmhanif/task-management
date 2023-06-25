import React, { useState } from "react";
import { Box, Tooltip } from "@mui/material";
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
        <Tooltip title="Not Available">
          <SentimentSatisfiedAltIcon
            sx={{ color: "#919191", marginLeft: "16px" }}
          />
        </Tooltip>
        <Tooltip title="Not Available">
          <AttachFileIcon sx={{ color: "#919191", marginLeft: "16px" }} />
        </Tooltip>
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
        <Tooltip title="Not Available">
          <MicOffIcon sx={{ color: "#919191", marginLeft: "16px" }} />
        </Tooltip>
      </Box>
    </div>
  );
}

export default AddTask;
