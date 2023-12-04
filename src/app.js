import React, { useCallback, useEffect, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import { disableScroll, enableScroll } from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modal, setModal] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartInfo = store.getCartInfo();

  useEffect(() => {
    if(modal) disableScroll();
    else enableScroll();
  }, [modal])

  const callbacks = {
    addToCart: useCallback(
      (item) => {
        store.addToCart(item);
      },
      [store]
    ),
    removeFromCart: useCallback(
      (code) => {
        store.removeFromCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      {modal && (
        <Modal visible={modal} setVisible={setModal}>
          <Cart
            cartList={cart}
            cartAction={callbacks.removeFromCart}
            setModal={setModal}
          />
        </Modal>
      )}
      <Controls setModal={setModal} cartInfo={cartInfo} />
      <List list={list} cartAction={callbacks.addToCart} />
    </PageLayout>
  );
}

export default App;
