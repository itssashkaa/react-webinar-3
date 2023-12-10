import useSelector from "../../store/use-selector"
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
import "./style.css"

function ItemInfo ({itemInfo, addToBasket, localeData}) {
    return (
        <div className="ItemInfo">
            <div className="ItemInfo__desc">{itemInfo.description}</div>
            <div className="ItemInfo__group">
                <div className="ItemInfo__group__title">{localeData.country}</div>
                <div className="ItemInfo__group__desc">: {itemInfo.madeIn?.title}({itemInfo.madeIn?.code})</div>
            </div>
            <div className="ItemInfo__group">
                <div className="ItemInfo__group__title">{localeData.category}</div>
                <div className="ItemInfo__group__desc">: {itemInfo.category?.title}</div>
            </div>
            <div className="ItemInfo__group">
                <div className="ItemInfo__group__title">{localeData.year}</div>
                <div className="ItemInfo__group__desc">: {itemInfo.edition}</div>
            </div>
            <div className="ItemInfo__price">{localeData.price}: {numberFormat(itemInfo ? itemInfo.price : 0)}</div>
            <button onClick={() => addToBasket(itemInfo._id)}>{localeData.btn_add}</button>
        </div>
    )
}

ItemInfo.propTypes = {
    itemInfo: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      madeIn: PropTypes.shape({
        title: PropTypes.string,
        code: PropTypes.string,
      }),
      category: PropTypes.shape({
        title: PropTypes.string,
      })
    }).isRequired,
    addToBasket: PropTypes.func,
    localeData: PropTypes.object
};

ItemInfo.defaultProps = {
    localeData: {}
}
  

export default ItemInfo