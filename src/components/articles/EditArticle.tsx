import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MuiLink from "@mui/material/Link";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Article } from "../../features/article/types";

type EditArticleProps = {
  article: Article;
};

function EditArticle({ article }: EditArticleProps) {
  return (
    <MuiLink component={Link} to={`../write-article/${article.id}`}>
      <Tooltip title="Edit">
        <span>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
        </span>
      </Tooltip>
    </MuiLink>
  );
}

export default EditArticle;
