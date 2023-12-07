import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10
    }
  }

  async load() {
    const { itemsPerPage, currentPage } = this.getState();
    const skipItems = (currentPage - 1) * itemsPerPage
    const response = await fetch(
      `api/v1/articles?limit=${itemsPerPage}&skip=${skipItems}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalItems: json.result.count,
    }, 'Загружены товары из АПИ');
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
  }
}

export default Catalog;
