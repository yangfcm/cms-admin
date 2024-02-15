import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Article, ArticleStatus, PostArticle } from "../features/article/types";
import useUserBlog from "../features/blog/useUserBlog";
import useAuth from "../features/user/useAuth";

type ArticleFormProps = {
  article: Article;
};

function ArticleForm(props: ArticleFormProps) {
  const { article } = props;
  const { activeBlog } = useUserBlog();
  const { authUser } = useAuth();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: article ? article.title : "",
      content: article ? article.content : "",
      featuredImage: article ? article.featuredImage : "",
      status: article ? article.status : ArticleStatus.DRAFT,
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
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}></Box>
    </FormProvider>
  );
}

export default ArticleForm;
