
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Plus, Filter, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerDetail } from '@/components/customers/CustomerDetail';
import { openWhatsApp, getBirthdayMessage, getSpecialOfferMessage } from '@/utils/whatsappUtils';
import { getCustomers} from "../services/api";

// Sample data for customers
const initialCustomersData = [
  {
    id: 'CUS-001',
    name: 'Abdul Rahman',
    phone: '+880 1712-345678',
    email: 'abdul.rahman@example.com',
    address: 'Gulshan, Dhaka',
    lastPurchase: '2023-08-10',
    totalOrders: 12,
    totalSpent: '৳145,000',
    favorite: 'Suits & Blazers',
  },
  {
    id: 'CUS-002',
    name: 'Faisal Khan',
    phone: '+880 1812-456789',
    email: 'faisal.k@example.com',
    address: 'Banani, Dhaka',
    lastPurchase: '2023-03-05',
    totalOrders: 5,
    totalSpent: '৳62,000',
    favorite: 'Panjabis',
  },
  {
    id: 'CUS-003',
    name: 'Nazia Begum',
    phone: '+880 1912-567890',
    email: 'nazia.b@example.com',
    address: 'Uttara, Dhaka',
    lastPurchase: '2023-07-22',
    totalOrders: 8,
    totalSpent: '৳98,500',
    favorite: 'Sherwanis',
  },
  {
    id: 'CUS-004',
    name: 'Kamal Hossain',
    phone: '+880 1612-678901',
    email: 'kamal.h@example.com',
    address: 'Dhanmondi, Dhaka',
    lastPurchase: '2023-08-30',
    totalOrders: 15,
    totalSpent: '৳180,000',
    favorite: 'Suits & Shirts',
  },
  {
    id: 'CUS-005',
    name: 'Farida Akter',
    phone: '+880 1512-789012',
    email: 'farida.a@example.com',
    address: 'Mirpur, Dhaka',
    lastPurchase: '2023-06-15',
    totalOrders: 7,
    totalSpent: '৳85,000',
    favorite: 'Custom Orders',
  },
];

const CustomerCard = ({ 
  customer, 
  onViewProfile 
}: { 
  customer: typeof initialCustomersData[0],
  onViewProfile: (customer: typeof initialCustomersData[0]) => void
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSendWishes = () => {
    const message = getBirthdayMessage(customer.name);
    openWhatsApp(customer.phone, message);
    toast({
      title: t('success'),
      description: `${t('whatsappMessage')} ${customer.name}`,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-subtle hover:shadow-elevated transition-shadow p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-tailoring-900">{customer.name}</h3>
          <p className="text-sm text-tailoring-500">{customer.id}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-tailoring-500 hover:text-tailoring-900" 
          onClick={() => onViewProfile(customer)}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-tailoring-500" />
          <span className="text-sm text-tailoring-700">{customer.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-tailoring-500" />
          <span className="text-sm text-tailoring-700">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-tailoring-500" />
          <span className="text-sm text-tailoring-700">{customer.address}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-tailoring-500" />
          <span className="text-sm text-tailoring-700">{t('lastPurchase')}: {new Date(customer.lastPurchase).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-tailoring-50 rounded p-2">
            <p className="text-xs text-tailoring-500">{t('totalOrders')}</p>
            <p className="font-semibold text-tailoring-900">{customer.totalOrders}</p>
          </div>
          <div className="bg-tailoring-50 rounded p-2">
            <p className="text-xs text-tailoring-500">{t('totalSpent')}</p>
            <p className="font-semibold text-tailoring-900">{customer.totalSpent}</p>
          </div>
        </div>
        {/* <div className="mt-3">
          <p className="text-xs text-tailoring-500">{t('favoriteProducts')}</p>
          <p className="text-sm font-medium text-tailoring-700">{customer.favorite}</p>
        </div> */}
        <div className="mt-3 flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={handleSendWishes}
          >
            {t('sendWishes')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Customers = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  // const [customersData, setCustomersData] = useState(initialCustomersData);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof initialCustomersData[0] | null>(null);
  const { toast } = useToast();
 const [customersData, setCustomersData] = useState([]);

useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      console.log(data)
      setCustomersData(data.customers);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  fetchCustomers();
}, []);
  const handleAddCustomer = async (newCustomer: typeof initialCustomersData[0]) => {
    try {
      const data = await getCustomers();
      console.log(data)
      setCustomersData(data.customers);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleViewProfile = (customer: typeof initialCustomersData[0]) => {
    setSelectedCustomer(customer);
  };

  const handleSendOffer = (customer: typeof initialCustomersData[0]) => {
    const message = getSpecialOfferMessage(customer.name);
    openWhatsApp(customer.phone, message);
    toast({
      title: t('success'),
      description: `${t('whatsappMessage')} ${customer.name}`,
    });
  };
  
  const filteredCustomers = customersData.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-tailoring-50">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-tailoring-950">{t('customerManagement')}</h1>
            <p className="text-tailoring-600 mt-1">{t('trackCustomers')}</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddingCustomer(true)}
          >
            <Plus className="h-4 w-4" />
            {t('addCustomer')}
          </Button>
        </div>
        
        <div className="bg-white rounded-lg border border-border shadow-subtle p-5 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tailoring-400 h-4 w-4" />
              <Input 
                placeholder={t('searchCustomers')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewType === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewType('grid')}
              >
                {t('gridView')}
              </Button>
              <Button 
                variant={viewType === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewType('list')}
              >
                {t('listView')}
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {viewType === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredCustomers.map((customer) => (
              <CustomerCard 
                key={customer.id} 
                customer={customer} 
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        ) : (
          <div className="table-wrapper animate-fade-in">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('customerName')}</th>
                  <th>{t('phoneNumber')}</th>
                  <th>{t('address')}</th>
                  <th>{t('lastPurchase')}</th>
                  <th>{t('orders')}</th>
                  <th>{t('totalSpent')}</th>
                  {/* <th>{t('preferences')}</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="font-medium text-tailoring-900">{customer.customer_id}</td>
                    <td>{customer.name}</td>
                    <td className="text-sm">
                      <div>{customer.phone}</div>
                      <div className="text-tailoring-500">{customer.email}</div>
                    </td>
                    <td>{customer.address}</td>
                    <td>{customer.lastOrderedProduct}</td>
                    <td className="text-center">{customer.totalOrders}</td>
                    <td>{customer.totalSpent}</td>
                    <td></td>
                    <td>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-tailoring-500 hover:text-tailoring-900"
                          onClick={() => handleSendOffer(customer)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-tailoring-500 hover:text-tailoring-900"
                          onClick={() => handleViewProfile(customer)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {isAddingCustomer && (
          <CustomerForm 
            open={isAddingCustomer} 
            onClose={() => setIsAddingCustomer(false)} 
            onSubmit={handleAddCustomer}
          />
        )}
        
        {selectedCustomer && (
          <CustomerDetail 
            open={!!selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
            customer={selectedCustomer}
          />
        )}
      </main>
    </div>
  );
};

export default Customers;
