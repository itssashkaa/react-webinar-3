import StoreModule from "../module";

class Item  extends StoreModule {  
    initState() {
      return {
        itemInfo: {}
      }
    }

    async getItem (id) {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            ...this.getState(),
            itemInfo: json.result
        }, 'Загружен товар из АПИ');
    }
  }
  
  export default Item;