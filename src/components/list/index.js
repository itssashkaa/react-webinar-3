import { memo, useState } from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import MyPagination from "../ui/my-pagination";
import useStore from "../../store/use-store";

function List({ list, renderItem, pagination}) {
  const isShowPagination = pagination.currentPage !== 0 && list.length > 0;
  console.log(isShowPagination);
  console.log(pagination);
  const store = useStore();

  return (
    <div className="List">
      {list.map((item) => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
      {isShowPagination && (
        <MyPagination
          currentPage={pagination.currentPage}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          setCurrentPage={pagination.changePage}
        />
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  renderItem: PropTypes.func,
  pagination: PropTypes.shape({
    totalItems: PropTypes.number,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    changePage: PropTypes.func,
  })
};

List.defaultProps = {
  renderItem: (item) => {},
  pagination: {
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 0,
    changePage: () => {}
  }
};

export default memo(List);
