
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import OrderFilters from '@/components/orders/OrderFilters';
import OrderStatusTabs from '@/components/orders/OrderStatusTabs';
import OrderList from '@/components/orders/OrderList';
import { OrderForm } from '@/components/orders/OrderForm';
import OrderStatusDashboard from '@/components/orders/OrderStatusDashboard';
import OrderFinancialSummary from '@/components/orders/OrderFinancialSummary';
import { mapLegacyOrdersToNewFormat } from '@/utils/orderUtils';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Order } from '@/types/orderTypes';
import { getOrders} from "../services/api";

const initialOrdersData = [
  {
    id: 'ORD-001',
    customerName: 'Abdul Rahman',
    phone: '+880 1712-345678',
    productType: 'Suit',
    orderDate: '2023-09-01',
    deliveryDate: '2023-09-15',
    status: 'Delivered',
    totalAmount: 25000,
    paidAmount: 25000,
    pendingAmount: 0,
  },
  {
    id: 'ORD-002',
    customerName: 'Faisal Khan',
    phone: '+880 1812-456789',
    productType: 'Panjabi',
    orderDate: '2023-08-20',
    deliveryDate: '2023-08-30',
    status: 'Ready for Pickup',
    totalAmount: 5500,
    paidAmount: 4000,
    pendingAmount: 1500,
  },
  {
    id: 'ORD-003',
    customerName: 'Nazia Begum',
    phone: '+880 1912-567890',
    productType: 'Sherwani',
    orderDate: '2023-08-15',
    deliveryDate: '2023-08-28',
    status: 'Sent to Factory',
    totalAmount: 32000,
    paidAmount: 20000,
    pendingAmount: 12000,
  },
  {
    id: 'ORD-004',
    customerName: 'Kamal Hossain',
    phone: '+880 1612-678901',
    productType: 'Suit',
    orderDate: '2023-08-10',
    deliveryDate: '2023-08-25',
    status: 'Order Taken',
    totalAmount: 28000,
    paidAmount: 15000,
    pendingAmount: 13000,
  },
  {
    id: 'ORD-005',
    customerName: 'Farida Akter',
    phone: '+880 1512-789012',
    productType: 'Custom Order',
    orderDate: '2023-08-05',
    deliveryDate: '2023-08-20',
    status: 'Delivered',
    totalAmount: 18000,
    paidAmount: 18000,
    pendingAmount: 0,
  },
];

const Orders = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  // const [ordersData, setOrdersData] = useState(initialOrdersData);
  const [activeTab, setActiveTab] = useState('all');
  const [ordersData, setOrdersData] = useState([]);
  const mappedOrders = mapLegacyOrdersToNewFormat(ordersData);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        console.log(data)
        setOrdersData(data.order);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchOrders();
  }, []);
  const handleAddOrder = (newOrder: any) => {
    setOrdersData([
      {
        id: `ORD-${Math.floor(Math.random() * 900) + 100}`,
        ...newOrder,
      }, 
      ...ordersData
    ]);
    setIsAddingOrder(false);
    toast({
      title: t('success'),
      description: 'Order added successfully',
    });
  };
  
  // Fixed filtering to safely handle potentially undefined values
  const filteredOrders = ordersData.filter(order => {
    const customerName = order.customerName || '';
    const phone = order.phone || '';
    const productType = order.productType || '';
    const id = order.id || '';
    const query = searchQuery.toLowerCase();
    
    return customerName.toLowerCase().includes(query) ||
           phone.includes(query) ||
           productType.toLowerCase().includes(query) ||
           id.toLowerCase().includes(query);
  });
  
  const filterOrdersByStatus = (orders: any[]) => {
    if (activeTab === 'all') return orders;
    
    const statusMap: Record<string, string> = {
      'new': 'Order Taken',
      'factory': 'Sent to Factory',
      'ready': 'Ready for Pickup',
      'delivered': 'Delivered'
    };
    
    return orders.filter(order => order.status === statusMap[activeTab]);
  };
  
  const displayedOrders = filterOrdersByStatus(filteredOrders);
  
  // Calculate status counts for the tabs
  const getStatusCounts = () => {
    const all = filteredOrders.length;
    const new_orders = filteredOrders.filter(order => order.status === 'Order Taken').length;
    const factory = filteredOrders.filter(order => order.status === 'Sent to Factory').length;
    const ready = filteredOrders.filter(order => order.status === 'Ready for Pickup').length;
    const delivered = filteredOrders.filter(order => order.status === 'Delivered').length;
    
    return {
      all,
      new: new_orders,
      factory,
      ready,
      delivered
    };
  };
  
  return (
    <div className="min-h-screen bg-tailoring-50">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-10 animate-fade-in">
        <PageHeader
          title={t('orderManagement')}
          description={t('trackOrders')}
          actionLabel={t('createOrder')}
          actionIcon={<Plus className="h-4 w-4" />}
          onAction={() => setIsAddingOrder(true)}
        />
        
        <OrderStatusDashboard orders={mappedOrders} />
        <OrderFinancialSummary orders={mappedOrders} />
        
        <OrderFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewType={viewType}
          setViewType={setViewType}
        />
        
        <div className="bg-white rounded-lg border border-border shadow-subtle p-5 mb-8 animate-fade-in-up">
          <OrderStatusTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            statusCounts={getStatusCounts()}
          />
        </div>
        
        {isAddingOrder && (
          <OrderForm 
            onSubmit={handleAddOrder}
          />
        )}
        
        <OrderList orders={ordersData} viewType={viewType} />;
      </main>
    </div>
  );
};

export default Orders;
