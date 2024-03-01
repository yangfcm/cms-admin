import { useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import TextInput from "../inputs/TextInput";
import useUserBlog from "../../features/blog/useUserBlog";
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from "../../features/tag/services";
import { PostTag, Tag } from "../../features/tag/types";
import {
  TAG_CREATE_FIXED_CACHE_KEY,
  TAG_NAME_REQUIRED,
  TAG_UPDATE_FIXED_CACHE_KEY,
} from "../../settings/constants";

type TagFormProps = {
  tag?: Tag;
  onCancel?: () => void;
  onCreateTagSuccess?: () => void;
  onUpdateTagSuccess?: () => void;
};
function TagForm(props: TagFormProps) {
  const { tag, onCancel, onCreateTagSuccess, onUpdateTagSuccess } = props;
  const { activeBlogAddress } = useUserBlog();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: tag ? tag.name : "",
    },
  });

  const [createTag, { isLoading: isCreating, isSuccess: createTagSuccess }] =
    useCreateTagMutation({ fixedCacheKey: TAG_CREATE_FIXED_CACHE_KEY });
  const [updateTag, { isLoading: isUpdating, isSuccess: updateTagSuccess }] =
    useUpdateTagMutation({
      fixedCacheKey: TAG_UPDATE_FIXED_CACHE_KEY,
    });

  const onSubmit = useCallback(
    (data: PostTag) => {
      if (tag) {
        updateTag({
          blogAddress: activeBlogAddress,
          tag: {
            ...data,
            id: tag.id,
          },
        });
      } else {
        createTag({
          blogAddress: activeBlogAddress,
          tag: data,
        });
      }
    },
    [activeBlogAddress, updateTag, createTag]
  );

  useEffect(() => {
    if (createTagSuccess && onCreateTagSuccess) {
      onCreateTagSuccess();
    }
    if (updateTagSuccess && onUpdateTagSuccess) {
      onUpdateTagSuccess();
    }
  }, [createTagSuccess, updateTagSuccess]);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="name"
          id="tag-name-input"
          label="Name"
          placeholder="Name"
          rules={{
            required: TAG_NAME_REQUIRED,
          }}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Button
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            disabled={isCreating || isUpdating}
          >
            Cancel
          </Button>
          <LoadingButton type="submit" loading={isCreating || isUpdating}>
            Submit
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default TagForm;