
import { Calendar, ArrowDown, ArrowUp } from 'lucide-react';
import Stats from './Stats';
import RecentOrders from './RecentOrders';
import InventoryCard from './InventoryCard';
import CustomerCard from './CustomerCard';
import QuickActions from './QuickActions';
import PendingDeliveriesList from './orders/PendingDeliveriesList';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ordersDatabase } from '@/types/orderTypes';

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-tailoring-950 dark:text-white">{t('dashboard')}</h1>
        <p className="text-tailoring-600 dark:text-tailoring-400 mt-1">{t('welcome')}</p>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Card className="w-full md:w-auto p-4 flex items-center gap-3 bg-tailoring-50 dark:bg-tailoring-900 border-none shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-2 rounded-full bg-white dark:bg-tailoring-800">
              <Calendar className="h-5 w-5 text-tailoring-800 dark:text-tailoring-300" />
            </div>
            <div>
              <p className="text-sm text-tailoring-600 dark:text-tailoring-400">Today's Date</p>
              <p className="font-medium text-tailoring-900 dark:text-white">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Card>
          
          <div className="flex flex-wrap gap-4">
            {/* <Card className="p-4 flex items-center gap-3 dark:bg-tailoring-900 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-tailoring-600 dark:text-tailoring-400">{t('dailySales')}</p>
                <p className="font-medium text-tailoring-900 dark:text-white">৳12,450</p>
              </div>
            </Card> */}
            
            {/* <Card className="p-4 flex items-center gap-3 dark:bg-tailoring-900 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
                <ArrowDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-tailoring-600 dark:text-tailoring-400">{t('dailyExpenses')}</p>
                <p className="font-medium text-tailoring-900 dark:text-white">৳4,250</p>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
      
      <QuickActions />
      
      <Stats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <RecentOrders />
          <PendingDeliveriesList />
        </div>
        <div className="space-y-8">
          <InventoryCard />
          {/* <CustomerCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
