import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import SwitchLang from "../../components/switch-lang";

function Main() {
  const store = useStore();
  const localeData = useSelector((state) => state.locale.localeData);
  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    itemsPerPage: state.catalog.itemsPerPage,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    changePage: useCallback(
      (page) => store.actions.catalog.setCurrentPage(page),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title={localeData.title}>
        <SwitchLang />
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List
        list={select.list}
        renderItem={renders.item}
        pagination={{
          currentPage: select.currentPage,
          totalItems: select.totalItems,
          itemsPerPage: select.itemsPerPage,
          changePage: callbacks.changePage,
        }}
      />
    </PageLayout>
  );
}

export default memo(Main);
