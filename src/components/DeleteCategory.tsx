import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function DeleteCategory() {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip title="Delete">
      <span>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default DeleteCategory;