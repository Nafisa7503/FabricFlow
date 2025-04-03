
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewType: 'grid' | 'list';
  setViewType: (type: 'grid' | 'list') => void;
}

const OrderFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  viewType, 
  setViewType 
}: OrderFiltersProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg border border-border shadow-subtle p-5 mb-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tailoring-400 h-4 w-4" />
          <Input 
            placeholder={t('searchOrders')}
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
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
