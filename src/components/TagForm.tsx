import { useForm, FormProvider } from "react-hook-form";
import useUserBlog from "../features/blog/useUserBlog";
import { useCreateTagMutation } from "../features/tag/services";
import { Tag } from "../features/tag/types";

type TagFormProps = {
  tag?: Tag;
  onCancel?: () => void;
  onCreateTagSuccess?: () => void;
  onUpdateTagSuccess?: () => void;
};
function TagForm(props: TagFormProps) {
  const { tag, onCancel, onCreateTagSuccess, onUpdateTagSuccess } = props;
  const activeBlogAddress = useUserBlog();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: tag ? tag.name : "",
    },
  });
}
