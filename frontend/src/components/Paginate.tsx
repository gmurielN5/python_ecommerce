import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

export const Paginate: React.FC<{
  pages: number;
  page: number;
  keyword?: string;
  isAdmin?: boolean;
}> = ({ pages, page, keyword = '', isAdmin = false }) => {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0];
  }
  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <Pagination.Item
          key={x + 1}
          as={Link}
          to={
            !isAdmin
              ? `/?keyword=${keyword}&page=${x + 1}`
              : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
          }
          active={x + 1 === page}
        >
          {x + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};
