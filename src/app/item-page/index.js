import { Link, useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import { useCallback, useEffect } from "react";
import Head from "../../components/head";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../../components/basket-tool";
import ItemInfo from "../../components/item-info/item-info";
import Nav from "../../components/nav";
import NavLinks from "../../components/nav-links";

function ItemPage() {
    const {_id} = useParams();
    const store = useStore();
    const localeData = useSelector((state) => state.locale.localeData);
    const select = useSelector(state => ({
        item: state.item.itemInfo,
        amount: state.basket.amount,
        sum: state.basket.sum,
        localeData: state.locale.localeData
      }));

    useEffect(() => {
        store.actions.item.getItem(_id);
    }, [_id])

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      }

    return (
        <PageLayout>
            <Head title={select.item?.title}/>
            <Nav>
                <NavLinks>
                    <Link to="/list" >{select.localeData.nav_main}</Link>
                </NavLinks>
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} localeData={select.localeData}/>
            </Nav>
            <ItemInfo itemInfo={select.item} addToBasket={callbacks.addToBasket} localeData={select.localeData}/>
        </PageLayout>
    )
}

export default ItemPage;