
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { openWhatsApp, getBirthdayMessage, getSpecialOfferMessage } from '@/utils/whatsappUtils';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Heart,
  AlertCircle,
  Package,
  DollarSign,
  Calendar
} from 'lucide-react';

interface CustomerOrderType {
  id: string;
  date: string;
  product: string;
  status: string;
  amount: string;
}

interface CustomerDetailProps {
  open: boolean;
  onClose: () => void;
  customer: {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    lastPurchase: string;
    totalOrders: number;
    totalSpent: string;
    favorite: string;
  };
}

// Sample orders for customer detail
const generateCustomerOrders = (customerId: string, count: number): CustomerOrderType[] => {
  const statuses = ['Order Taken', 'Sent to Factory', 'Ready for Pickup', 'Delivered'];
  const products = ['Suit', 'Shirt', 'Panjabi', 'Sherwani', 'Custom Outfit'];
  
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (index * 15)); // Orders every 15 days in the past
    
    return {
      id: `ORD-${Math.floor(Math.random() * 900) + 100}`,
      date: date.toISOString().split('T')[0],
      product: products[Math.floor(Math.random() * products.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      amount: `৳${(Math.floor(Math.random() * 15) + 5) * 1000}`,
    };
  });
};

export const CustomerDetail = ({ open, onClose, customer }: CustomerDetailProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [customerOrders] = useState<CustomerOrderType[]>(
    generateCustomerOrders(customer.id, customer.totalOrders)
  );

  const handleSendWishes = () => {
    const message = getBirthdayMessage(customer.name);
    openWhatsApp(customer.phone, message);
    toast({
      title: t('success'),
      description: `${t('whatsappMessage')} ${customer.name}`,
    });
  };

  const handleSendOffer = () => {
    const message = getSpecialOfferMessage(customer.name);
    openWhatsApp(customer.phone, message);
    toast({
      title: t('success'),
      description: `${t('whatsappMessage')} ${customer.name}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{customer.name}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="bg-tailoring-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.id}</p>
                  <p className="text-sm text-tailoring-600">{t('customerName')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.phone}</p>
                  <p className="text-sm text-tailoring-600">{t('phoneNumber')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.email}</p>
                  <p className="text-sm text-tailoring-600">{t('email')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.address}</p>
                  <p className="text-sm text-tailoring-600">{t('address')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ShoppingBag className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.totalOrders}</p>
                  <p className="text-sm text-tailoring-600">{t('totalOrders')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">
                    {new Date(customer.lastPurchase).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-tailoring-600">{t('lastPurchase')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.totalSpent}</p>
                  <p className="text-sm text-tailoring-600">{t('totalSpent')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-tailoring-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-tailoring-900">{customer.favorite}</p>
                  <p className="text-sm text-tailoring-600">{t('favoriteProducts')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              onClick={handleSendWishes}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              {t('sendWishes')}
            </Button>
            <Button 
              onClick={handleSendOffer}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              {t('sendOffer')}
            </Button>
          </div>
          
          <Tabs defaultValue="orders" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {t('orders')}
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {t('preferences')}
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {t('notes')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t('date')}</th>
                      <th>{t('product')}</th>
                      <th>{t('status')}</th>
                      <th>{t('amount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="font-medium text-tailoring-900">{order.id}</td>
                        <td>{new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</td>
                        <td>{order.product}</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-tailoring-100 text-tailoring-800 text-xs">
                            {order.status}
                          </span>
                        </td>
                        <td>{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences">
              <div className="bg-tailoring-50 p-5 rounded-lg text-center">
                <Heart className="h-12 w-12 mx-auto text-tailoring-300" />
                <h3 className="mt-2 text-lg font-medium text-tailoring-900">{t('customerPreferences')}</h3>
                <p className="text-tailoring-600 mt-1">{customer.favorite}</p>
                <p className="text-tailoring-500 mt-4">
                  {t('additionalPreferences') || 'Additional Preferences'}: {t('noPreferencesYet')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="notes">
              <div className="bg-tailoring-50 p-5 rounded-lg text-center">
                <AlertCircle className="h-12 w-12 mx-auto text-tailoring-300" />
                <h3 className="mt-2 text-lg font-medium text-tailoring-900">{t('notes')}</h3>
                <p className="text-tailoring-500 mt-4">{t('noNotesYet')}</p>
                <Button className="mt-4">
                  {t('addNote') || 'Add Note'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
