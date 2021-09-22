import _ from "lodash";
import React from "react";

const Pagination = (props) => {
  const { currentPage, pageSize, itemsCount, onPageChange } = props;

  const pagesCount = itemsCount / pageSize;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav id="pagination">
      <ul id="pages">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "active" : null}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
