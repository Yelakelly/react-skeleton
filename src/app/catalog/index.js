import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import * as actions from "@store/actions";
import LayoutContent from '@components/layouts/layout-content';
import HeaderContainer from "@containers/header-container";
import LayoutPage from "@components/layouts/layout-page";
import ArticleList from "@containers/article-list";
import CategoryTree from "@containers/category-tree";
import useActions from "@utils/use-actions";

const Catalog = React.memo((props) => {

  console.log(props);

  //const {categoryId} = useParams();

  const categoryId = props.match.params.categoryId;
  // Загрузка и обновление списка товаров при выборе категории
  // useEffect(()=>{
  //   actions.articles.load({
  //     fields: '*,category(title),maidIn(title)',
  //     search: {category: categoryId}
  //   });
  //   return () => {
  //     actions.articles.reset();
  //   }
  // }, [categoryId]);
  //
  // // Загрузка категорий
  // useEffect(()=>{
  //   actions.categories.load({fields: '*', limit: 1000});
  // }, []);

  useActions(async () => {
    await actions.articles.load({
      fields: '*,category(title),maidIn(title)',
      search: {category: categoryId}
    });
  }, [categoryId]);

  useActions(async () => {
    await actions.categories.load({fields: '*', limit: 1000});
  });

  return (
    <LayoutPage header={<HeaderContainer/>}>
      <LayoutContent>
        <h1>Каталог</h1>
        <CategoryTree/>
        <hr/>
        <ArticleList/>
      </LayoutContent>
    </LayoutPage>
  );
});

export default Catalog;
