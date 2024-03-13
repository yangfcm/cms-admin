import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Article, ArticleStatus } from "../../features/article/types";
import useUserBlog from "../../features/blog/useUserBlog";
import TextInput from "../inputs/TextInput";
import EditorInput from "../inputs/EditorInput";
import SwitchInput from "../inputs/SwitchInput";
import SelectInput from "../inputs/SelectInput";
import MultiSelectInput from "../inputs/MultiSelectInput";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "../../features/article/services";
import { useReadCategoriesQuery } from "../../features/category/services";
import { useReadTagsQuery } from "../../features/tag/services";
import {
  ARTICLE_CATEGORY_REQUIRED,
  ARTICLE_TITLE_REQUIRED,
} from "../../settings/constants";
import parseError from "../../utils/parseError";

type ArticleFormProps = {
  article?: Article;
  onCreateArticleSuccess?: () => void;
  onUpdateArticleSuccess?: () => void;
  onCreateArticleError?: (error: string | string[]) => void;
  onUpdateArticleError?: (error: string | string[]) => void;
};

type ArticleFormData = Pick<
  Article,
  "title" | "content" | "featuredImage" | "isTop"
> & { categoryId: string; tagIds: string[]; isDraft: boolean };

function ArticleForm(props: ArticleFormProps) {
  const {
    article,
    onCreateArticleSuccess,
    onUpdateArticleSuccess,
    onCreateArticleError,
    onUpdateArticleError,
  } = props;

  const { activeBlogAddress } = useUserBlog();
  const { data: { categories = [] } = {} } =
    useReadCategoriesQuery(activeBlogAddress);
  const { data: { tags = [] } = {} } = useReadTagsQuery(activeBlogAddress);

  const [
    createArticle,
    {
      isLoading: isCreatingArticle,
      isSuccess: isCreateArticleSuccess,
      isError: isCreateArticleError,
      error: createArticleError,
    },
  ] = useCreateArticleMutation();

  const [
    updateArticle,
    {
      isLoading: isUpdatingArticle,
      isSuccess: isUpdateArticleSuccess,
      isError: isUpdateArticleError,
      error: updateArticleError,
    },
  ] = useUpdateArticleMutation();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: article ? article.title : "",
      content: article ? article.content : "",
      featuredImage: article ? article.featuredImage : "",
      // status: article ? article.status : ArticleStatus.DRAFT,
      isDraft: article ? article.status === ArticleStatus.DRAFT : true,
      isTop: article ? article.isTop : false,
      categoryId: article ? article.category.id : "",
      tagIds: article ? article.tags.map((t) => t.id) : [],
    },
  });

  const onSubmit = useCallback(
    (data: ArticleFormData) => {
      const newArticleData = {
        ...data,
        status: data.isDraft ? ArticleStatus.DRAFT : ArticleStatus.PUBLISHED,
      };
      if (!!article) {
        updateArticle({
          blogAddress: activeBlogAddress,
          article: {
            ...newArticleData,
            id: article.id,
          },
        });
      } else {
        createArticle({
          blogAddress: activeBlogAddress,
          article: newArticleData,
        });
      }
    },
    [activeBlogAddress]
  );

  useEffect(() => {
    if (isCreateArticleSuccess && onCreateArticleSuccess) {
      onCreateArticleSuccess();
    }
    if (isUpdateArticleSuccess && onUpdateArticleSuccess) {
      onUpdateArticleSuccess();
    }
  }, [isCreateArticleSuccess, isUpdateArticleSuccess]);

  useEffect(() => {
    if (isCreateArticleError && onCreateArticleError) {
      onCreateArticleError(parseError(createArticleError));
    }
    if (isUpdateArticleError && onUpdateArticleError) {
      onUpdateArticleError(parseError(updateArticleError));
    }
  }, [
    isCreateArticleError,
    createArticleError,
    isUpdateArticleError,
    updateArticleError,
  ]);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="title"
          id="article-title-input"
          label="Title"
          rules={{
            validate: (value) =>
              value.trim().length > 0 ? true : ARTICLE_TITLE_REQUIRED,
          }}
          placeholder="The title of the article"
        />
        <TextInput
          name="featuredImage"
          id="featured-image-input"
          label="Featured Image"
          placeholder="The URL of the featured image for the article. Start with 'http://' or 'https://'"
        />
        <Box mb={3}>
          <EditorInput name="content" />
        </Box>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={12} sm={6}>
            <SelectInput
              name="categoryId"
              label="Category"
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              disabled={categories.length === 0}
              rules={{ required: ARTICLE_CATEGORY_REQUIRED }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MultiSelectInput
              name="tagIds"
              label="Tags"
              options={tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              disabled={tags.length === 0}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <SwitchInput
              name="isDraft"
              label="Draft"
              helperText="Save as draft or live."
              legend="Article Status"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <SwitchInput
              name="isTop"
              label="Top"
              helperText="Place the article on top."
              legend="Set as top"
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <LoadingButton
            loading={isCreatingArticle || isUpdatingArticle}
            type="submit"
            variant="contained"
            size="large"
          >
            Publish
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default ArticleForm;
