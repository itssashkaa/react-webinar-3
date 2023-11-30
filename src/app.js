import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modal, setModal] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

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
      <Controls setModal={setModal} cart={cart} />
      <List list={list} cartAction={callbacks.addToCart} />
    </PageLayout>
  );
}

export default App;
