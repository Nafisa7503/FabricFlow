
import { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for recent orders
const recentOrdersData = [
  { 
    id: 'ORD-001', 
    customer: 'Masud Ahmed', 
    product: 'Suit (3 Piece)', 
    date: '2023-09-10', 
    status: 'Ready for Pickup',
    amount: '৳12,500',
  },
  { 
    id: 'ORD-002', 
    customer: 'Karim Rahman', 
    product: 'Panjabi (Premium)', 
    date: '2023-09-09', 
    status: 'Stitching',
    amount: '৳4,200',
  },
  { 
    id: 'ORD-003', 
    customer: 'Jamal Uddin', 
    product: 'Mujib Coat', 
    date: '2023-09-08', 
    status: 'Cutting',
    amount: '৳5,800',
  },
  { 
    id: 'ORD-004', 
    customer: 'Anwar Hossain', 
    product: 'Shirt (Cotton)', 
    date: '2023-09-07', 
    status: 'Measurement Taken',
    amount: '৳1,800',
  },
  { 
    id: 'ORD-005', 
    customer: 'Rafiq Islam', 
    product: 'Sherwani', 
    date: '2023-09-06', 
    status: 'Final Fitting',
    amount: '৳9,500',
  },
];

// Status badge component with appropriate colors
const StatusBadge = ({ status }: { status: string }) => {
  let color;
  
  switch(status) {
    case 'Ready for Pickup':
      color = 'bg-green-100 text-green-800';
      break;
    case 'Final Fitting':
      color = 'bg-blue-100 text-blue-800';
      break;
    case 'Stitching':
      color = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Cutting':
      color = 'bg-orange-100 text-orange-800';
      break;
    case 'Measurement Taken':
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

const RecentOrders = () => {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-tailoring-900">Recent Orders</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-tailoring-600 hover:text-tailoring-900 flex items-center gap-1"
          asChild
        >
          <a href="/orders">
            View all
            <ChevronRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentOrdersData.map((order) => (
              <tr key={order.id}>
                <td className="font-medium text-tailoring-900">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{new Date(order.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>{order.amount}</td>
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
    </div>
  );
};

export default RecentOrders;
