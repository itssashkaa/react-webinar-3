import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class Categories extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  initCategories() {
    fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        ...this.getState(),
        categories: json.result.items
      });
    })
  }
}

export default Categories;
