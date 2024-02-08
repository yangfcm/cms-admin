import { useForm, FormProvider } from 'react-hook-form';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { LoadingButton } from '@mui/lab';
import TextInput from './TextInput';
import { Category, PostCategory } from '../features/category/types';
import { CATEGORY_NAME_REQUIRED } from '../settings/constants';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../features/category/services';
import useUserBlog from '../features/blog/useUserBlog';

type CategoryFormProps = {
  category?: Category;
  onCancel?: () => void;
};
function CategoryForm(props: CategoryFormProps) {
  const { category, onCancel } = props;
  const { activeBlogAddress } = useUserBlog();

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: category? category.name : '',
      description: category ? category.description : '',
    }
  });

  const [createCategory, createCategoryState] = useCreateCategoryMutation();
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();

  const onSubmit = (data: PostCategory) => {
    if(category) {
      updateCategory({
        blogAddress: activeBlogAddress,
        category: {
          ...data,
          id: category.id,
        },
      });
    } else {
      createCategory({
        blogAddress: activeBlogAddress,
        category: data,
      });
    }
  }

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
          <Button type="button" onClick={() => {onCancel && onCancel()}}>Cancel</Button>
          <LoadingButton
            type="submit"
          >
            Submit
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  )
}

export default CategoryForm;