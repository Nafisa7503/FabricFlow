
import { Order, ProductType } from '@/types/orderTypes';

// This function converts legacy order data to the new Order format
export const mapLegacyOrdersToNewFormat = (legacyOrders: any[]): Order[] => {
  return legacyOrders.map(order => ({
    id: order.order_id,
    customer: {
      name: order.customer_id.name,
      phone: order.customer._id.phone
    },
    productType: order.product_id.fabric_type.toLowerCase(),
    orderDate: order.order_date,
    deliveryDate: order.delivery_date,
    status: order.order_status as any,
    payment: {
      totalAmount: order.total_amount,
      paidAmount: order.paid_amount,
      pendingAmount: order.due_amount,
      // finalTotalAmount: order.finalTotalAmount || order.totalAmount // Adding the new field
    },
    products: order.product_id || [], // Adding support for the new products field
    assignedTo: order.assignedTo || '', // Add assigned employee field
    notes: order.notes || '', // Add notes field
    instructions: order.instructions || '' // Add instructions field
  }));
};

// Calculate tailoring price based on product type and quantity
export const calculateTailoringPrice = (productType: string, quantity: number): number => {
  switch (productType) {
    case 'shirt':
      return 600 * quantity;
    case 'pant':
      return 700 * quantity;
    case 'suit_2piece':
      return 6500 * quantity;
    case 'suit_3piece':
      return 8500 * quantity;
    case 'panjabi':
      return 900 * quantity;
    case 'payjama':
      return 700 * quantity;
    default:
      return 0;
  }
};

// Generate PDF for customer or factory
export const generatePDF = (order: Order, type: 'customer' | 'factory'): void => {
  console.log(`Generating ${type} PDF for order ${order.id}`);
  
  if (type === 'customer') {
    // Customer slip includes customer info, products, prices, but no measurements
    console.log('Customer Copy includes:');
    console.log('- Customer Name:', order.customer.name);
    console.log('- Phone:', order.customer.phone);
    console.log('- Order Date:', order.orderDate);
    console.log('- Delivery Date:', order.deliveryDate);
    console.log('- Products:', order.productType);
    console.log('- Total Amount:', order.payment.totalAmount);
    console.log('- Paid Amount:', order.payment.paidAmount);
    console.log('- Due Amount:', order.payment.pendingAmount);
  } else {
    // Factory slip includes measurements, customer name, delivery date, but no financial details
    console.log('Factory Copy includes:');
    console.log('- Customer Name:', order.customer.name);
    console.log('- Delivery Date:', order.deliveryDate);
    console.log('- Products:', order.productType);
    console.log('- Measurements:', order.products && order.products.length ? 'Included' : 'None');
    if (order.assignedTo) {
      console.log('- Assigned To:', order.assignedTo);
    }
    if (order.instructions) {
      console.log('- Instructions:', order.instructions);
    }
  }
  
  // In a real implementation, this would use a library like jsPDF or redirect to a server endpoint
};

// Helper to get product name from product ID
export const getProductNameFromId = (productId: string): string => {
  const productMap: Record<string, string> = {
    'shirt': 'Shirt',
    'pant': 'Pant',
    'suit_2piece': 'Suit (2-piece)',
    'suit_3piece': 'Suit (3-piece)',
    'panjabi': 'Panjabi',
    'payjama': 'Payjama'
  };
  
  return productMap[productId] || productId;
};

// Search orders by ID, customer name, or phone
export const searchOrders = (orders: Order[], searchTerm: string): Order[] => {
  if (!searchTerm) return orders;
  
  const lowerCaseSearch = searchTerm.toLowerCase();
  
  return orders.filter(order => 
    order.id.toLowerCase().includes(lowerCaseSearch) ||
    order.customer.name.toLowerCase().includes(lowerCaseSearch) ||
    order.customer.phone.toLowerCase().includes(lowerCaseSearch)
  );
};

// Search orders specifically by ID
export const searchOrderById = (orders: Order[], orderId: string): Order | undefined => {
  return orders.find(order => order.id.toLowerCase() === orderId.toLowerCase());
};

// Sort orders by date (newest first)
export const sortOrdersByDate = (orders: Order[]): Order[] => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.orderDate).getTime();
    const dateB = new Date(b.orderDate).getTime();
    return dateB - dateA; // Descending order (newest first)
  });
};

// Sort pending deliveries by delivery date
export const sortPendingDeliveries = (orders: Order[]): Order[] => {
  return [...orders]
    .filter(order => order.status !== 'Delivered')
    .sort((a, b) => {
      const dateA = new Date(a.deliveryDate).getTime();
      const dateB = new Date(b.deliveryDate).getTime();
      return dateA - dateB; // Ascending by delivery date
    });
};

// Get orders assigned to a specific employee
export const getOrdersByEmployee = (orders: Order[], employeeId: string): Order[] => {
  return orders.filter(order => order.assignedTo === employeeId);
};

// Calculate total due amount
export const getTotalDueAmount = (orders: Order[]): number => {
  return orders.reduce((total, order) => total + order.payment.pendingAmount, 0);
};

// Get product types in a structured format
export const getProductTypes = (): ProductType[] => {
  return [
    { id: 'shirt', name: 'Shirt' },
    { id: 'pant', name: 'Pant' },
    { id: 'suit_2piece', name: 'Suit (2-piece)' },
    { id: 'suit_3piece', name: 'Suit (3-piece)' },
    { id: 'panjabi', name: 'Panjabi' },
    { id: 'payjama', name: 'Payjama' },
  ];
};
