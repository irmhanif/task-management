import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "6px",
};

export default function TransitionsModal(props) {
  const { title = "Create New Board", btnAction = () => {} } = props;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleModal = () => setOpen(!open);
  const handleBtnAction = () => {
    if (inputValue) {
      btnAction(inputValue);
      handleModal();
    }
  };
  return (
    <div>
      <Button
        onClick={handleModal}
        variant="contained"
        className="mx-1 w-90 center"
      >
        + Add New Board
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
                  <h5 className="font-bold">{title}</h5>
            <div
              className="row"
              style={{ marginTop: "15px", justifyItems: "center" }}
            >
              <div className="col-md-12">
                  <h6 className="font-medium">Board Name</h6>
                <TextField
                  id="standard-basic"
                  label=""
                  variant="standard"
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div
                className="row"
                style={{ alignItems: "self-end", marginTop: "25px" }}
              >
                <div className="col-md-12">
                  <h6 className="font-medium">Column Items</h6>
                </div>
                <div className="col-md-10">
                  <TextField
                    id="standard-basic"
                    label=""
                    variant="standard"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <Button
                    onClick={handleBtnAction}
                    variant="contained"
                    className="mx-1 w-90 center"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div
                className="row"
                style={{ marginTop: "25px", justifyItems: "center" }}
              >
                <Button
                  onClick={handleBtnAction}
                  variant="contained"
                  className="mx-1 w-90 center"
                >
                  Create
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
