
import { ExternalLink, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order, OrderStatus } from '@/types/orderTypes';
import { format } from 'date-fns';

interface OrderListProps {
  orders: Order[];
  viewType: 'grid' | 'list';
}

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  let color;
  
  switch(status) {
    case 'Delivered':
      color = 'bg-green-100 text-green-800';
      break;
    case 'Ready for Pickup':
      color = 'bg-blue-100 text-blue-800';
      break;
    case 'Sent to Factory':
      color = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Order Taken':
      color = 'bg-purple-100 text-purple-800';
      break;
    default:
      color = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const PaymentBadge = ({ payment }: { payment: Order['payment'] }) => {
  const isPaid = payment.pendingAmount === 0;
  const isPartial = payment.paidAmount > 0 && payment.pendingAmount > 0;
  
  let color = isPaid ? 'bg-green-100 text-green-800' : 
              isPartial ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800';
  
  let status = isPaid ? 'Paid' : isPartial ? 'Partial' : 'Pending';
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="bg-white rounded-lg border border-border shadow-subtle hover:shadow-elevated transition-shadow p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-tailoring-900">{order.id}</h3>
          <StatusBadge status={order.status} />
        </div>
        <Button variant="ghost" size="icon" className="text-tailoring-500 hover:text-tailoring-900">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4 space-y-3">
        <div>
          <span className="text-sm font-medium text-tailoring-800">{order.customer.name}</span>
          <span className="text-xs text-tailoring-500 block">{order.customer.phone}</span>
        </div>
        <div>
          <span className="text-sm text-tailoring-800">{order.productType}</span>
        </div>
        <div>
          <span className="text-xs text-tailoring-500 block">
            Order Date: {format(new Date(order.orderDate), 'dd/MM/yyyy')}
          </span>
          <span className="text-xs text-tailoring-500 block">
            Delivery Date: {format(new Date(order.deliveryDate), 'dd/MM/yyyy')}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
        <div>
          <p className="text-xs text-tailoring-500">Amount</p>
          <p className="font-semibold text-tailoring-900">৳{order.payment.totalAmount}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-tailoring-500">Payment</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-tailoring-800">
              ৳{order.payment.paidAmount} / ৳{order.payment.totalAmount}
            </span>
            <PaymentBadge payment={order.payment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderList = ({ orders, viewType }: OrderListProps) => {
  if (viewType === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    );
  }

  return (
    <div className="table-wrapper animate-fade-in">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Payment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="font-medium text-tailoring-900">{order.id}</td>
              <td>
                <div>{order.customer.name}</div>
                <div className="text-xs text-tailoring-500">{order.customer.phone}</div>
              </td>
              <td>{order.productType}</td>
              <td>{format(new Date(order.orderDate), 'dd/MM/yyyy')}</td>
              <td>{format(new Date(order.deliveryDate), 'dd/MM/yyyy')}</td>
              <td><StatusBadge status={order.status} /></td>
              <td className="font-medium">৳{order.payment.totalAmount}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    ৳{order.payment.paidAmount} / ৳{order.payment.totalAmount}
                  </span>
                  <PaymentBadge payment={order.payment} />
                </div>
              </td>
              <td>
                <Button variant="ghost" size="icon" className="text-tailoring-500 hover:text-tailoring-900">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
