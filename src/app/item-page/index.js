import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import { useCallback, useEffect } from "react";
import Head from "../../components/head";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../../components/basket-tool";
import ItemInfo from "../../components/item-info/item-info";

function ItemPage() {
    const {_id} = useParams();
    const store = useStore();
    const select = useSelector(state => ({
        item: state.item.itemInfo,
        amount: state.basket.amount,
        sum: state.basket.sum
      }));

    useEffect(() => {
        store.actions.item.getItem(_id);
    }, [])

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      }

    return (
        <PageLayout>
            <Head title={select.item?.title}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
            <ItemInfo itemInfo={select.item} addToBasket={callbacks.addToBasket}/>
        </PageLayout>
    )
}

export default ItemPage;