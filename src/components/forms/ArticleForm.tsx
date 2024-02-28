import { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {
  Article,
  ArticleStatus,
  PostArticle,
} from "../../features/article/types";
import useUserBlog from "../../features/blog/useUserBlog";
import useAuth from "../../features/user/useAuth";
import TextInput from "../inputs/TextInput";
import EditorInput from "../inputs/EditorInput";
import SwitchInput from "../inputs/SwitchInput";
import SelectInput from "../inputs/SelectInput";
import { useReadCategoriesQuery } from "../../features/category/services";
import { useReadTagsQuery } from "../../features/tag/services";

type ArticleFormProps = {
  article?: Article;
};

function ArticleForm(props: ArticleFormProps) {
  const { article } = props;
  const { activeBlog } = useUserBlog();
  const { authUser } = useAuth();
  const { data: categories } = useReadCategoriesQuery(activeBlog!.address);
  const { data: tags } = useReadTagsQuery(activeBlog!.address);

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: article ? article.title : "",
      content: article ? article.content : "",
      featuredImage: article ? article.featuredImage : "",
      // status: article ? article.status : ArticleStatus.DRAFT,
      isDraft: article ? article.status === ArticleStatus.DRAFT : true,
      isTop: article ? article.isTop : false,
      blogId: activeBlog!.id,
      userId: authUser!.id,
      categoryId: article ? article.category.id : "",
      tagIds: article ? article.tags.map((t) => t.id) : [],
    },
  });

  const onSubmit = useCallback((data: PostArticle) => {
    console.log(data);
  }, []);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="title"
          id="article-title-input"
          label="Title"
          rules={{ required: true }}
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
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            <SelectInput name="category" label="Category" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput name="tag" label="Tag" />
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
          <LoadingButton type="submit" variant="contained" size="large">
            Publish
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default ArticleForm;
