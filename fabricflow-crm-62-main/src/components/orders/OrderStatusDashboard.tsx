
import { ClipboardList, Hammer, PackageCheck, ShoppingBag } from 'lucide-react';
import OrderStatusCard from './OrderStatusCard';
import { getOrderStatusCount } from '@/types/orderTypes';
import { Order } from '@/types/orderTypes';

interface OrderStatusDashboardProps {
  orders: Order[];
}

const OrderStatusDashboard = ({ orders }: OrderStatusDashboardProps) => {
  const statusCounts = getOrderStatusCount(orders);
  
  const totalOrders = orders.length;
  
  return (
    <div className="mb-8 animate-fade-in-up">
      <h2 className="text-lg font-semibold text-tailoring-900 mb-4">Order Status Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <OrderStatusCard 
          title="Order Taken"
          count={statusCounts['Order Taken']}
          total={totalOrders}
          icon={<ClipboardList className="h-4 w-4 text-blue-500" />}
          className="bg-blue-50 border-blue-100"
        />
        <OrderStatusCard 
          title="Sent to Factory"
          count={statusCounts['Sent to Factory']}
          total={totalOrders}
          icon={<Hammer className="h-4 w-4 text-amber-500" />}
          className="bg-amber-50 border-amber-100"
        />
        <OrderStatusCard 
          title="Ready for Pickup"
          count={statusCounts['Ready for Pickup']}
          total={totalOrders}
          icon={<PackageCheck className="h-4 w-4 text-green-500" />}
          className="bg-green-50 border-green-100"
        />
        <OrderStatusCard 
          title="Delivered"
          count={statusCounts['Delivered']}
          total={totalOrders}
          icon={<ShoppingBag className="h-4 w-4 text-purple-500" />}
          className="bg-purple-50 border-purple-100"
        />
      </div>
      <div className="mt-4 flex justify-between bg-tailoring-100 rounded-lg p-4">
        <div>
          <span className="text-sm text-tailoring-600">Total Orders</span>
          <p className="text-xl font-bold text-tailoring-900">{totalOrders}</p>
        </div>
        <div>
          <span className="text-sm text-tailoring-600">Completion Rate</span>
          <p className="text-xl font-bold text-tailoring-900">
            {totalOrders > 0 
              ? Math.round((statusCounts['Delivered'] / totalOrders) * 100) 
              : 0}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDashboard;
