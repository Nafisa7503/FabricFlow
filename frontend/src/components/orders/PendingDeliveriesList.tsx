
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sortPendingDeliveries } from '@/utils/orderUtils';
import { Order } from '@/types/orderTypes';
import { format } from 'date-fns';
import { pendingOrders} from "../../services/api";


interface PendingDeliveriesListProps {
  orders: Order[];
}

const PendingDeliveriesList = ( )=> {
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await pendingOrders();
        console.log(data)
        setPendingDeliveries(data.orders);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchOrders();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Pending Deliveries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingDeliveries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending deliveries</p>
        ) : (
          <div className="space-y-3">
            {pendingDeliveries.map((order) => (
              <div key={order.id} className="bg-muted/30 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.order_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Delivery on</p>
                    <p className="font-medium">{format(new Date(order.deliveryDate), "dd MMM yyyy")}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>{order.products[0].productType}</span>
                  <span className={
                    order.status === 'Ready for Pickup' 
                      ? 'text-green-600' 
                      : order.status === 'Sent to Factory' 
                        ? 'text-amber-600' 
                        : 'text-blue-600'
                  }>
                    {order.status}
                  </span>
                </div>
                {order.assignedTo && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Assigned to: {order.assignedTo}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingDeliveriesList;
