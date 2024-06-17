import { useAppDispatch } from '../store/hooks';
import { addToCart } from './cartSlice';

import { CartItems } from './cartSlice';
import { ProductType } from '../products/productsSlice';

export const addCartItem = async (
  id: string,
  qty: number
): CartItems[] => {
  const dispatch = useAppDispatch();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`
  );
  const data: ProductType = await response.json();
  console.log(data);
};
