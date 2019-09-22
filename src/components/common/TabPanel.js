import React from "react";
import { Typography, Box } from "@material-ui/core";

export default props => {
  const { children, value, index, ...other } = props;
  return (
    <React.Framgnet>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tabpanel-${index}`}
        {...other}
      >
        <Box>{children}</Box>
      </Typography>
    </React.Framgnet>
  );
};

export const a11yProps = index => {
  return {
    id: `tabpanel-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
};
