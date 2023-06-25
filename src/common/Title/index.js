import { Typography } from "@mui/material";
import React from "react";

function Title(props) {
  const { value, variant = "h5" } = props;
  return (
    <Typography variant={variant} component={variant}>
      {value}
    </Typography>
  );
}

export default Title;
