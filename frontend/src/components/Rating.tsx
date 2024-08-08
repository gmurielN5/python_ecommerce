import Rating from '@mui/material/Rating';

export const BasicRating: React.FC<{
  value: number;
  text?: string;
}> = ({ value, text }) => {
  return (
    <>
      <Rating name="read-only" value={value} readOnly />
      <span>{text && text}</span>
    </>
  );
};
