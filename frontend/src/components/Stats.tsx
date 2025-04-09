import { useState, useEffect } from 'react';
import { CreditCard, Users, ShoppingBag, TrendingUp, Box } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { totalCustomers,totalIncome, totalProducts, newOrders } from "../services/api";

interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  trend?: {
    value: string;
    positive: boolean;
  };
  delay?: number;
}

const StatCard = ({ title, value, icon, trend, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className="stagger-item stagger-fade-in-up stat-card dark:bg-tailoring-900 dark:border-tailoring-800" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="text-tailoring-500 dark:text-tailoring-400 text-sm font-medium">{title}</p>
        <div className="p-2 rounded-full bg-tailoring-50 dark:bg-tailoring-800 text-tailoring-500 dark:text-tailoring-400">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-tailoring-900 dark:text-white">{value}</h3>
        {/* {trend && (
          <div className="flex items-center mt-1">
            <div className={`text-xs font-medium flex items-center ${
              trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <TrendingUp className={`h-3 w-3 mr-1 ${
                trend.positive ? '' : 'transform rotate-180'
              }`} />
              {trend.value}
            </div>
            <span className="text-xs text-tailoring-400 dark:text-tailoring-500 ml-1">vs last month</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [totalSale, settotalSale] = useState<number | null>(null);
  const [newOrder, setnewOrder] = useState<number | null>(null);
  const [totalProduct, settotalProduct] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await totalCustomers();
        setCustomerCount(response.totalCustomers);
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    };

    fetchTotalCustomers();
  }, []);


  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await totalIncome();
        settotalSale(response.totalIncome);
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    };

    fetchTotalIncome();
  }, []);

  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const response = await newOrders();
        setnewOrder(response.totalOrders);
      } catch (error) {
        console.error("Error fetching new orders:", error);
      }
    };

    fetchNewOrders();
  }, []);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await totalProducts();
        settotalProduct(response.totalProducts);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    fetchTotalProducts();
  }, []); 

  return (
    <div className="dashboard-grid">
      <StatCard 
        title={t('totalSales')} 
        value={`৳${totalSale !== null ? totalSale.toString() : "Loading..."}`} 
        icon={<CreditCard className="h-5 w-5" />} 
        trend={{ value: "12%", positive: true }}
        delay={100}
      />
      <StatCard 
        title={t('totalCustomers')} 
        value={customerCount !== null ? customerCount.toString() : "Loading..."} 
        icon={<Users className="h-5 w-5" />} 
        trend={{ value: "5%", positive: true }}
        delay={200}
      />
      <StatCard 
        title={t('newOrders')} 
        value={newOrder !== null ? newOrder.toString() : "Loading..."} 
        icon={<ShoppingBag className="h-5 w-5" />} 
        trend={{ value: "2%", positive: false }}
        delay={300}
      />
      <StatCard 
        title={t('inventoryItems')} 
        value={totalProduct !== null ? totalProduct.toString() : "Loading..."} 
        icon={<Box className="h-5 w-5" />}
        delay={400}
      />
    </div>
  );
};

export default Stats;
