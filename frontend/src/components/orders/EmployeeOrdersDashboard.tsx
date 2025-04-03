
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getOrdersByEmployee, sortOrdersByDate } from '@/utils/orderUtils';
import { Order, EMPLOYEES } from '@/types/orderTypes';
import { format } from 'date-fns';

interface EmployeeOrdersDashboardProps {
  orders: Order[];
}

const EmployeeOrdersDashboard = ({ orders }: EmployeeOrdersDashboardProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeOrders, setEmployeeOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (selectedEmployee) {
      const filtered = getOrdersByEmployee(orders, selectedEmployee);
      setEmployeeOrders(sortOrdersByDate(filtered));
    } else {
      setEmployeeOrders([]);
    }
  }, [selectedEmployee, orders]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Employee Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger>
            <SelectValue placeholder="Select an employee" />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYEES.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedEmployee && (
          <div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">
                Assigned Orders: {employeeOrders.length}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {employeeOrders.length > 0 ? (
                employeeOrders.map((order) => (
                  <div key={order.id} className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm">{order.customer.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs">Ordered on</p>
                        <p className="text-sm">{format(new Date(order.orderDate), "dd MMM yyyy")}</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{order.productType}</span>
                      <span className={
                        order.status === 'Delivered' 
                          ? 'text-green-600' 
                          : order.status === 'Ready for Pickup' 
                            ? 'text-blue-600' 
                            : order.status === 'Sent to Factory'
                              ? 'text-amber-600'
                              : 'text-purple-600'
                      }>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No orders assigned to this employee</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeOrdersDashboard;
