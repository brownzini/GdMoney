import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface Props {
  currentPage:number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages:number;
  productsLength:number;
}

export default function PaginationControlled({
  currentPage,
  setCurrentPage,
  totalPages,
  productsLength,
}:Props) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <Stack spacing={2}>
     {productsLength > 0 
        && <Pagination
              count={totalPages} 
              page={currentPage} 
              onChange={handleChange} 
            />
     }
    </Stack>
  );
}