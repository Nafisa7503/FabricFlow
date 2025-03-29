
export type OrderStatus = 
  | 'Order Taken'
  | 'Sent to Factory'
  | 'Ready for Pickup'
  | 'Delivered';

export type ProductType = {
  id: string;
  name: string;
};

export interface Payment {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  finalTotalAmount?: number;
}

export interface Customer {
  name: string;
  phone: string;
}

export interface Measurement {
  [key: string]: string;
}

export interface Product {
  productType: string;
  quantity: number;
  measurements: Measurement[];
  fabricTaken: boolean;
  fabricCode?: string;
  fabricPrice?: number;
}

export interface Order {
  id: string;
  customer: Customer;
  productType: string;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  payment: Payment;
  products?: Product[];
  assignedTo?: string;
  notes?: string;
  instructions?: string;
}

// Mock database for storing orders
let nextOrderId = 7; // Start from ORD-007 since we have 6 example orders
export const ordersDatabase: Order[] = [
  { 
    id: 'ORD-001', 
    customer: {
      name: 'Masud Ahmed',
      phone: '+880 1712-123456'
    },
    productType: 'suit',
    orderDate: '2024-04-10',
    deliveryDate: '2024-04-20',
    status: 'Ready for Pickup',
    payment: {
      totalAmount: 12500,
      paidAmount: 8000,
      pendingAmount: 4500
    }
  },
  { 
    id: 'ORD-002', 
    customer: {
      name: 'Karim Rahman',
      phone: '+880 1612-234567'
    },
    productType: 'panjabi',
    orderDate: '2024-04-09',
    deliveryDate: '2024-04-18', 
    status: 'Sent to Factory',
    payment: {
      totalAmount: 4200,
      paidAmount: 4200,
      pendingAmount: 0
    }
  },
  { 
    id: 'ORD-003', 
    customer: {
      name: 'Jamal Uddin',
      phone: '+880 1812-345678'
    },
    productType: 'coat',
    orderDate: '2024-04-08',
    deliveryDate: '2024-04-17', 
    status: 'Order Taken',
    payment: {
      totalAmount: 5800,
      paidAmount: 0,
      pendingAmount: 5800
    }
  },
  { 
    id: 'ORD-004', 
    customer: {
      name: 'Anwar Hossain',
      phone: '+880 1912-456789'
    },
    productType: 'shirt',
    orderDate: '2024-04-07',
    deliveryDate: '2024-04-15', 
    status: 'Delivered',
    payment: {
      totalAmount: 1800,
      paidAmount: 1800,
      pendingAmount: 0
    }
  },
  { 
    id: 'ORD-005', 
    customer: {
      name: 'Rafiq Islam',
      phone: '+880 1512-567890'
    },
    productType: 'sherwani',
    orderDate: '2024-04-06',
    deliveryDate: '2024-04-14', 
    status: 'Ready for Pickup',
    payment: {
      totalAmount: 9500,
      paidAmount: 5000,
      pendingAmount: 4500
    }
  },
  { 
    id: 'ORD-006', 
    customer: {
      name: 'Nasir Khan',
      phone: '+880 1712-678901'
    },
    productType: 'panjabi',
    orderDate: '2024-04-05',
    deliveryDate: '2024-04-12', 
    status: 'Delivered',
    payment: {
      totalAmount: 3200,
      paidAmount: 3200,
      pendingAmount: 0
    }
  },
];

export const PRODUCT_TYPES: ProductType[] = [
  { id: 'shirt', name: 'Shirt' },
  { id: 'pant', name: 'Pants' },
  { id: 'suit_2piece', name: 'Suit (2-piece)' },
  { id: 'suit_3piece', name: 'Suit (3-piece)' },
  { id: 'panjabi', name: 'Panjabi' },
  { id: 'payjama', name: 'Payjama' },
];

export const EMPLOYEES = [
  { id: 'emp1', name: 'Jamal Ahmed' },
  { id: 'emp2', name: 'Karim Rahman' },
  { id: 'emp3', name: 'Nasir Khan' },
  { id: 'emp4', name: 'Fatima Begum' },
];

export const addOrder = (orderData: Omit<Order, 'id'>): Order => {
  const newOrder = {
    ...orderData,
    id: `ORD-${String(nextOrderId).padStart(3, '0')}`
  };
  nextOrderId++;
  ordersDatabase.unshift(newOrder); // Add to the beginning of the array
  return newOrder;
};

export const getOrderStatusCount = (orders: Order[]): Record<OrderStatus, number> => {
  const initialCount: Record<OrderStatus, number> = {
    'Order Taken': 0,
    'Sent to Factory': 0,
    'Ready for Pickup': 0,
    'Delivered': 0
  };
  
  return orders.reduce((acc, order) => {
    acc[order.status]++;
    return acc;
  }, initialCount);
};

export const getFinancialSummary = (orders: Order[]) => {
  return orders.reduce((summary, order) => {
    summary.totalOrderValue += order.payment.totalAmount;
    summary.totalPaid += order.payment.paidAmount;
    summary.totalPending += order.payment.pendingAmount;
    
    // Track order value by status
    summary.orderValueByStatus[order.status] += order.payment.totalAmount;
    
    return summary;
  }, {
    totalOrderValue: 0,
    totalPaid: 0,
    totalPending: 0,
    orderValueByStatus: {
      'Order Taken': 0,
      'Sent to Factory': 0,
      'Ready for Pickup': 0,
      'Delivered': 0
    }
  });
};
