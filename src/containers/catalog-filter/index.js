import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { createCategoryTree } from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    category: state.catalog.params.categories
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    changeCategory: useCallback(category => store.actions.catalog.setParams({page: 1, category}), [store])
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку', _id: 1},
      {value: 'title.ru', title: 'По именованию', _id: 2},
      {value: '-price', title: 'Сначала дорогие', _id: 3},
      {value: 'edition', title: 'Древние', _id: 4},
    ]), []),
    categories: useMemo(() => {
      const categories = createCategoryTree(select.categories).map(category => (
        {title: category.title, value: category._id}
      ));
      return [
        {title: 'Все', value: ''},
        ...categories
      ]
    }, [select.categories])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.changeCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
