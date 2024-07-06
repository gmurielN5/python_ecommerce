// import {
//   PayPalScriptProvider,
//   PayPalButtons,
// } from '@paypal/react-paypal-js';

// type PayPalButtonsProps = {
//   amount: string;
//   onSuccess: (details: any, data: any) => void;
// };

// const PayPalButton: React.FC<PayPalButtonsProps> = ({
//   amount,
//   onSuccess,
// }) => {
//   const CLIENT_ID = `${import.meta.env.VITE_PAYMENT_API}`;

//   return (
//     <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
//       <PayPalButtons
//         style={{ layout: 'vertical' }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: amount.toString(),
//                 },
//               },
//             ],
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then((details) => {
//             onSuccess(details, data);
//           });
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };
// export default PayPalButton;
