import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from "./FormDialog";
import TextInput from "./TextInput";
import { CATEGORY_NAME_REQUIRED } from "../settings/constants";

type AddCategoryFormProps = {
  onCancel: () => void
};

function AddCategoryForm({onCancel}: AddCategoryFormProps) {
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: '',
      description: ''
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="name"
          id="category-name-input"
          label="Name"
          placeholder="Name"
          rules={{
            required: CATEGORY_NAME_REQUIRED
          }}
        />
        <TextInput
          name="description"
          id="category-description-input"
          label="Description"
          placeholder="Description"
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Button type="button" onClick={onCancel}>Cancel</Button>
          <LoadingButton
            type="submit"
          >
            Submit
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}

function AddCategory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<AddCircleIcon />}
      >
        Add Category
      </Button>
      <FormDialog
        title="Add a new category"
        open={open}
        form={<AddCategoryForm onCancel={() => setOpen(false)} />}
      />
    </>
  )
}

export default AddCategory;