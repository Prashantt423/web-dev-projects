import React from "react";
import "./textInput.css";
import SendIcon from "@mui/icons-material/Send";

export default function TextInput() {
  return (
    <div className="messegeWritingBox">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        className="textWriterInput"
      ></textarea>
      <SendIcon
        color="success"
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          margin: "23px",
          transform: "translateY(50%) scale(1.2)",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      />
    </div>
  );
}
