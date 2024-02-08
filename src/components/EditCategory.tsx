import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function EditCategory() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip title="Edit">
      <span>
        <IconButton>
          <ModeEditIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default EditCategory;