
import { useState } from 'react';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for inventory items running low
const lowInventoryData = [
  { 
    id: 'FB-001', 
    name: 'Premium Cotton (Blue)', 
    type: 'Shirting',
    available: '5 meters',
    threshold: '10 meters',
  },
  { 
    id: 'FB-023', 
    name: 'Italian Wool (Black)', 
    type: 'Suiting',
    available: '3 meters',
    threshold: '8 meters',
  },
  { 
    id: 'FB-045', 
    name: 'Linen Blend (Beige)', 
    type: 'Panjabi',
    available: '4 meters',
    threshold: '12 meters',
  },
];

const InventoryCard = () => {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="bg-white rounded-lg border border-border shadow-subtle p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-tailoring-900">Low Inventory Alert</h2>
            <div className="ml-2 bg-amber-100 p-1 rounded-full">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-tailoring-600 hover:text-tailoring-900 flex items-center gap-1"
            asChild
          >
            <a href="/inventory">
              View all
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="space-y-3">
          {lowInventoryData.map((item) => (
            <div 
              key={item.id}
              className="p-3 rounded-md border border-border flex justify-between items-center hover:bg-tailoring-50 transition-colors"
            >
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-tailoring-900">{item.name}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-tailoring-100 text-tailoring-700 text-xs">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center mt-1 gap-1">
                  <span className="text-sm text-red-600 font-medium">{item.available}</span>
                  <span className="text-xs text-tailoring-400">/ threshold: {item.threshold}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Restock</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
