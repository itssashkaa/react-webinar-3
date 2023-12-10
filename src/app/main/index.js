import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import SwitchLang from "../../components/switch-lang";
import { Link } from "react-router-dom";
import Nav from "../../components/nav";
import NavLinks from "../../components/nav-links";

function Main() {
  const store = useStore();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    itemsPerPage: state.catalog.itemsPerPage,
    localeData: state.locale.localeData,
    lang: state.locale.lang
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
    changeLang: useCallback(
      (langId) => store.actions.locale.setLocale(langId),
      [store]
    )
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} localeData={select.localeData}/>;
      },
      [callbacks.addToBasket, select.localeData]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.localeData.title}>
        <SwitchLang changeLang={callbacks.changeLang} lang={select.lang}/>
      </Head>
      <Nav>
        <NavLinks>
          <Link to="/list">{select.localeData.nav_main}</Link>
        </NavLinks>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} localeData={select.localeData}/>
      </Nav>
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
