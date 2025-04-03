
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, UserPlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-fade-in">
      <Button 
        className="h-24 text-lg flex flex-col gap-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
        onClick={() => navigate('/orders?action=create')}
      >
        <ShoppingBag className="h-8 w-8" />
        {t('addSale')}
      </Button>
      
      <Button 
        className="h-24 text-lg flex flex-col gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
        onClick={() => navigate('/inventory')}
      >
        <Search className="h-8 w-8" />
        {t('searchInventory')}
      </Button>
      
      <Button 
        className="h-24 text-lg flex flex-col gap-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-lg"
        onClick={() => navigate('/finance?action=addExpense')}
      >
        <UserPlus className="h-8 w-8" />
        {t('expense')}
      </Button>
    </div>
  );
};

export default QuickActions;
