
import { ChevronRight, Cake } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for customer notifications
const customerNotificationsData = [
  {
    id: 'CUS-001',
    name: 'Abdul Rahman',
    type: 'Birthday',
    date: '2023-09-15',
    message: 'Birthday in 5 days',
    action: 'Send wishes',
  },
  {
    id: 'CUS-032',
    name: 'Faisal Khan',
    type: 'Follow-up',
    date: '2023-09-12',
    message: 'No purchase in 6 months',
    action: 'Send offer',
  },
  {
    id: 'CUS-073',
    name: 'Nazia Begum',
    type: 'Birthday',
    date: '2023-09-20',
    message: 'Birthday in 10 days',
    action: 'Send wishes',
  },
];

// Notification component with appropriate icon and styling
const CustomerNotification = ({ notification }: { notification: typeof customerNotificationsData[0] }) => {
  const isBirthday = notification.type === 'Birthday';
  
  return (
    <div className="p-3 rounded-md border border-border hover:bg-tailoring-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${
            isBirthday ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
          }`}>
            {isBirthday ? (
              <Cake className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
          <div>
            <p className="font-medium text-tailoring-900">{notification.name}</p>
            <p className="text-sm text-tailoring-600">{notification.message}</p>
            <p className="text-xs text-tailoring-400 mt-1">
              {new Date(notification.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">{notification.action}</Button>
      </div>
    </div>
  );
};

const CustomerCard = () => {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <div className="bg-white rounded-lg border border-border shadow-subtle p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-tailoring-900">Customer Notifications</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-tailoring-600 hover:text-tailoring-900 flex items-center gap-1"
            asChild
          >
            <a href="/customers">
              View all
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="space-y-3">
          {customerNotificationsData.map((notification) => (
            <CustomerNotification 
              key={notification.id} 
              notification={notification} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
