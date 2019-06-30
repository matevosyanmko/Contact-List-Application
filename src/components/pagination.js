import React from 'react';
import { Link } from 'react-router-dom';
// arrows
import IosArrowDropleftCircle from 'react-ionicons/lib/IosArrowDropleftCircle';
import IosArrowDroprightCircle from 'react-ionicons/lib/IosArrowDroprightCircle';

const Pagination = (props) => {
  const { currentPage, maxPageNum } = props;
  return (
    <div className="pagination">
      {Number(currentPage) > 1 && <Link to={`/page/${Number(currentPage) - 1}`} children={<IosArrowDropleftCircle color="#4CAF50" fontSize="46px" />} className="pagination_prev" />}
      {Number(currentPage) < maxPageNum && <Link to={`/page/${Number(currentPage) + 1}`} children={<IosArrowDroprightCircle color="#4CAF50" fontSize="46px" />} className="pagination_next" />}
    </div>
  );
};
export default Pagination;
