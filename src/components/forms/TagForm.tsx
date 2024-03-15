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
import { TAG_NAME_REQUIRED } from "../../settings/constants";
import parseError from "../../utils/parseError";

type TagFormProps = {
  tag?: Tag;
  onCancel?: () => void;
  onCreateTagSuccess?: () => void;
  onUpdateTagSuccess?: () => void;
  onCreateTagError?: (error: string | string[]) => void;
  onUpdateTagError?: (error: string | string[]) => void;
};

function TagForm(props: TagFormProps) {
  const {
    tag,
    onCancel,
    onCreateTagSuccess,
    onUpdateTagSuccess,
    onCreateTagError,
    onUpdateTagError,
  } = props;
  const { activeBlogAddress } = useUserBlog();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: tag ? tag.name : "",
    },
  });

  const [
    createTag,
    {
      isLoading: isCreating,
      isSuccess: createTagSuccess,
      isError: isCreateTagError,
      error: createTagError,
      reset: resetCreateTagState,
    },
  ] = useCreateTagMutation();

  const [
    updateTag,
    {
      isLoading: isUpdating,
      isSuccess: updateTagSuccess,
      isError: isUpdateTagError,
      error: updateTagError,
      reset: resetUpdateTagState,
    },
  ] = useUpdateTagMutation();

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

  useEffect(() => {
    if (isCreateTagError && onCreateTagError) {
      onCreateTagError(parseError(createTagError));
    }
    if (isUpdateTagError && onUpdateTagError) {
      onUpdateTagError(parseError(updateTagError));
    }
  }, [isCreateTagError, isUpdateTagError, createTagError, updateTagError]);

  useEffect(() => {
    return () => {
      if (tag) {
        resetUpdateTagState();
      } else {
        resetCreateTagState();
      }
    };
  }, []);

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
