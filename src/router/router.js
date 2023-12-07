import ItemPage from "../app/item-page";
import Main from "../app/main";

export const routes = [
    {path: '/list', component:  Main},
    {path: '/list/:_id', component:  ItemPage},
]