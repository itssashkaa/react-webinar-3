import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./style.css"

function MyPagination (props) {
    const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
    const [pages, setPages] = useState([]);
    let isPageOutOfRange = false;

    useEffect(() => {
        setPages(() => (
            [...new Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                const isCurrentPage = pageNum === props.currentPage;
                const isFirstPage = pageNum === 1;
                const isLastPage = pageNum === totalPages;
                const isCurrentPageFirst = props.currentPage === 1;
                const isCurrentPageLast = props.currentPage === totalPages;
                const isPageInRange = Math.abs(pageNum - props.currentPage) < 2;
                const isNumberInFirstOrLastRange = (isCurrentPageLast || isCurrentPageFirst) && Math.abs(pageNum - props.currentPage) < 3

                if (isFirstPage || isLastPage || isPageInRange || isNumberInFirstOrLastRange) {
                    isPageOutOfRange = false;
                    return (
                        <div key={index} className={`MyPagination__item${isCurrentPage ? ' MyPagination__item_active' : ''}`} onClick={() => changePage(pageNum)}>{pageNum}</div>
                    )
                }

                if (!isPageOutOfRange) {
                    isPageOutOfRange = true;
                    return (
                        <div key={index} className="MyPagination__item_empty">...</div>
                    )
                }
            })
        ))
    }, [props.currentPage])

    function changePage (page) {
        props.setCurrentPage(page)
    }

    return (
        <div className="MyPagination">
            {pages.map((page) => (
                page
            ))}
        </div>
    )
}

MyPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
}

export default MyPagination;