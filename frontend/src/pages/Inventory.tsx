import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Plus, Filter, RefreshCcw, Package, Box, Shirt, Scissors, Tag } from 'lucide-react';
import { InventoryForm } from '@/components/inventory/InventoryForm';
import { useToast } from '@/hooks/use-toast';
import { getProducts, updateStock } from "../services/api";
// Sample data for fabrics inventory with updated fields
const initialFabricsData = [
  {
    id: 'FB-001',
    name: 'Premium Cotton',
    type: 'Shirting',
    available: 15,
    buyingPrice: 850,
    sellingPrice: 1000,
  },
  {
    id: 'FB-002',
    name: 'Italian Wool',
    type: 'Suiting',
    available: 8,
    buyingPrice: 2400,
    sellingPrice: 2800,
  },
  {
    id: 'FB-003',
    name: 'Linen Blend',
    type: 'Panjabi',
    available: 12,
    buyingPrice: 1200,
    sellingPrice: 1400,
  },
  {
    id: 'FB-004',
    name: 'Egyptian Cotton',
    type: 'Shirting',
    available: 20,
    buyingPrice: 950,
    sellingPrice: 1150,
  },
  {
    id: 'FB-005',
    name: 'Silk Blend',
    type: 'Sherwani',
    available: 6,
    buyingPrice: 3200,
    sellingPrice: 3800,
  },
  {
    id: 'FB-006',
    name: 'Polyester Blend',
    type: 'Suiting',
    available: 14,
    buyingPrice: 1100,
    sellingPrice: 1300,
  },
];

const Inventory = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [fabricCodeSearch, setFabricCodeSearch] = useState('');
  const [isAddingFabric, setIsAddingFabric] = useState(false);
  // const [fabricsData, setFabricsData] = useState(initialFabricsData);
  const [isEditingFabric, setIsEditingFabric] = useState<string | null>(null);
  const [fabricsData, setFabricsData] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data)
        setFabricsData(data.products);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleAddFabric = async (newFabric: typeof initialFabricsData[0]) => {
    try {
      const data = await getProducts();
      console.log(data)
      setFabricsData(data.products);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleEditFabric = (fabricId: string) => {
    setIsEditingFabric(fabricId);
    // In a real app, this would open an edit form
    toast({
      title: t('editing'),
      description: `${t('editing')} ${fabricId}`,
    });
  };

  const handleDeleteFabric = (fabricId: string) => {
    // Confirm deletion
    if (window.confirm(t('confirmDelete'))) {
      setFabricsData(prev => prev.filter(fabric => fabric.id !== fabricId));
      toast({
        title: t('deleted'),
        description: `${t('fabric')} ${fabricId} ${t('hasBeenDeleted')}`,
      });
    }
  };

  const handleUpdateStock = async (fabricId: string, newStock: number) => {
    try {
      // Call the updateStock method from api.js
      await updateStock(fabricId, { quantity: newStock });

      // Call getProducts() to refresh the product list
      const data = await getProducts();
      setFabricsData(data.products);

      // Show a success toast
      toast({
        title: t('stockUpdated'),
        description: `${t('fabric')} ${fabricId} ${t('stockUpdatedTo')} ${newStock}`,
      });
    } catch (error) {
      console.error("Error updating stock:", error);

      // Show an error toast

    }
  };
  
  const filteredFabrics = fabricsData.filter((fabric) => 
    // fabric.id.toLowerCase().includes(fabricCodeSearch.toLowerCase()) ||
    fabric.fabric_name.toLowerCase().includes(fabricCodeSearch.toLowerCase()) ||
    fabric.fabric_type.toLowerCase().includes(fabricCodeSearch.toLowerCase())
    
    
  );
  
  return (
    <div className="min-h-screen bg-tailoring-50">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-tailoring-950">{t('inventoryManagement')}</h1>
            <p className="text-tailoring-600 mt-1">{t('trackInventory')}</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddingFabric(true)}
          >
            <Plus className="h-4 w-4" />
            {t('addNewItem')}
          </Button>
        </div>
        
        <Tabs defaultValue="fabrics" className="animate-fade-in-up">
          <TabsList className="mb-6">
            <TabsTrigger value="fabrics" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {t('fabrics')}
            </TabsTrigger>
            <TabsTrigger value="accessories" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              {t('accessories')}
            </TabsTrigger>
            <TabsTrigger value="ready-made" className="flex items-center gap-2">
              <Shirt className="h-4 w-4" />
              {t('readyMade')}
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {t('suppliers')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fabrics" className="animate-fade-in">
            <div className="bg-white rounded-lg border border-border shadow-subtle p-5">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tailoring-400 h-4 w-4" />
                  <Input 
                    placeholder={t('searchByFabricCode')}
                    className="pl-10"
                    value={fabricCodeSearch}
                    onChange={(e) => setFabricCodeSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{('Name')}</th>
                      <th>{('Type')}</th>
                      <th>{('Color')}</th>
                      <th>{('Pattern')}</th>
                      <th>{('Quantity')}</th>
                      <th>{('Price')}</th>
                      <th>{('Quality')}</th>
                      {/* <th>{('Supplier')}</th> */}
                      <th>{('Actions')}</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFabrics.map((fabric) => (
                      <tr key={fabric.id}>
                        <td className="font-medium text-tailoring-900">{fabric.fabric_id}</td>
                        <td>{fabric.fabric_name}</td>
                        <td>{fabric.fabric_type}</td>
                        <td>{fabric.color}</td>
                        <td>{fabric.pattern}</td>
                        <td>{fabric.quantity} {t('pieces')}</td>
                        <td>৳{fabric.price}</td>
                        <td>{fabric.quality}</td>
                        <td>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateStock(fabric._id, fabric.available + 1)}
                            >
                              {t('addStock')}
                            </Button>
                            {/* <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditFabric(fabric.id)}
                            >
                              {t('edit')}
                            </Button> */}
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteFabric(fabric.id)}
                            >
                              {t('delete')}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accessories">
            <div className="bg-white rounded-lg border border-border shadow-subtle p-8 text-center">
              <Box className="h-12 w-12 mx-auto text-tailoring-300" />
              <h3 className="mt-4 text-xl font-medium text-tailoring-900">{t('noAccessoriesYet')}</h3>
              <p className="mt-2 text-tailoring-600">{t('startAddingAccessories')}</p>
              <Button className="mt-4">{t('addAccessories')}</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="ready-made">
            <div className="bg-white rounded-lg border border-border shadow-subtle p-8 text-center">
              <Shirt className="h-12 w-12 mx-auto text-tailoring-300" />
              <h3 className="mt-4 text-xl font-medium text-tailoring-900">{t('noReadyMadeYet')}</h3>
              <p className="mt-2 text-tailoring-600">{t('startAddingProducts')}</p>
              <Button className="mt-4">{t('addProducts')}</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="suppliers">
            <div className="bg-white rounded-lg border border-border shadow-subtle p-8 text-center">
              <Tag className="h-12 w-12 mx-auto text-tailoring-300" />
              <h3 className="mt-4 text-xl font-medium text-tailoring-900">{t('noSuppliersYet')}</h3>
              <p className="mt-2 text-tailoring-600">{t('startAddingSuppliers')}</p>
              <Button className="mt-4">{t('addSupplier')}</Button>
            </div>
          </TabsContent>
        </Tabs>

        {isAddingFabric && (
          <InventoryForm 
            open={isAddingFabric} 
            onClose={() => setIsAddingFabric(false)} 
            onSubmit={handleAddFabric}
          />
        )}
      </main>
    </div>
  );
};

export default Inventory;
