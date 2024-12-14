import { Link } from 'react-router-dom';
import { Box, Pagination, PaginationItem } from '@mui/material';

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ m: 2 }}
    >
      <Pagination
        page={page}
        count={pages}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${item.page}`
                : `/admin/productlist/?keyword=${keyword}&page=${item.page}`
            }
            {...item}
          />
        )}
      />
    </Box>
  );
};
