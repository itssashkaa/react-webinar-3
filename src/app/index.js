import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import ProtectedRoute from "../containers/protected-route";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const select = useSelector ((state) => ({
    isAuth: state.user.isAuth,
    activeModal: state.modals.name
  }))
  const store = useStore();
  useInit(() => {
    store.actions.user.initUser();
  });

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <ProtectedRoute isAllowed={!select.isAuth} redirectPath={"/"}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute isAllowed={select.isAuth !== null && select.isAuth} redirectPath={"/login"}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
