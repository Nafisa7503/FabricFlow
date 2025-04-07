
import { DollarSign, CreditCard, Wallet } from 'lucide-react';
import { Order } from '@/types/orderTypes';

interface OrderFinancialSummaryProps {
  orders: Order[];
}

const OrderFinancialSummary = ({ orders }: OrderFinancialSummaryProps) => {
  // Calculate financial summaries
  const financialSummary = orders.reduce(
    (summary, order) => {
      summary.totalValue += order.payment.totalAmount;
      summary.totalPaid += order.payment.paidAmount;
      summary.totalPending += order.payment.totalAmount - order.payment.paidAmount;
      return summary;
    },
    { totalValue: 0, totalPaid: 0, totalPending: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
      <div className="bg-white rounded-lg border border-border shadow-subtle p-4 flex items-center">
        <div className="rounded-full bg-blue-100 p-3 mr-4">
          <DollarSign className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-tailoring-500">Total Order Value</p>
          <p className="text-xl font-bold text-tailoring-900">
            ৳{financialSummary.totalValue.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-border shadow-subtle p-4 flex items-center">
        <div className="rounded-full bg-green-100 p-3 mr-4">
          <CreditCard className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-tailoring-500">Total Paid</p>
          <p className="text-xl font-bold text-tailoring-900">
            ৳{financialSummary.totalPaid.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-border shadow-subtle p-4 flex items-center">
        <div className="rounded-full bg-amber-100 p-3 mr-4">
          <Wallet className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm text-tailoring-500">Total Pending</p>
          <p className="text-xl font-bold text-tailoring-900">
            ৳{financialSummary.totalPending.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderFinancialSummary;
