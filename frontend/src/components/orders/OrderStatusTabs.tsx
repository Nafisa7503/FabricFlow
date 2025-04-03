
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface OrderStatusTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  statusCounts?: {
    all: number;
    new: number;
    factory: number;
    ready: number;
    delivered: number;
  };
}

const OrderStatusTabs = ({ 
  activeTab, 
  setActiveTab, 
  statusCounts = { all: 0, new: 0, factory: 0, ready: 0, delivered: 0 } 
}: OrderStatusTabsProps) => {
  return (
    <div className="mt-4 border-t pt-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All
            {statusCounts?.all > 0 && (
              <Badge variant="secondary" className="ml-2">{statusCounts.all}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="new">
            New Orders
            {statusCounts?.new > 0 && (
              <Badge variant="secondary" className="ml-2">{statusCounts.new}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="factory">
            In Factory
            {statusCounts?.factory > 0 && (
              <Badge variant="secondary" className="ml-2">{statusCounts.factory}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="ready">
            Ready
            {statusCounts?.ready > 0 && (
              <Badge variant="secondary" className="ml-2">{statusCounts.ready}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered
            {statusCounts?.delivered > 0 && (
              <Badge variant="secondary" className="ml-2">{statusCounts.delivered}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default OrderStatusTabs;
