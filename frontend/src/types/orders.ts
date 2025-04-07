
export type OrderStatus = 
  | 'Order Taken'
  | 'Sent to Factory' 
  | 'Ready for Pickup'
  | 'Delivered';

export type ProductType = {
  id: string;
  name: string;
};

export type OrderPayment = {
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
};

export type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  // productType: string;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  payment: OrderPayment;
};

export const INITIAL_PRODUCT_TYPES: ProductType[] = [
  { id: 'suit', name: 'Suit' },
  { id: 'panjabi', name: 'Panjabi' },
  { id: 'sherwani', name: 'Sherwani' },
  { id: 'coat', name: 'Coat' },
  { id: 'shirt', name: 'Shirt' },
];
