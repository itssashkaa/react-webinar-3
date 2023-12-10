import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../router/router';
import ItemPage from './item-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/list' element={<Main />} />
        <Route path='/list/:_id' element={<ItemPage />} />
        <Route path="*" element={<Navigate to="/list" replace />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
