
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrderStatus, ProductType } from '@/types/orderTypes';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { getProducts} from "../../services/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductMeasurements from './ProductMeasurements';

const ORDER_STATUSES: OrderStatus[] = [
  'Order Taken',
  'Sent to Factory',
  'Ready for Pickup',
  'Delivered'
];

const PRODUCT_TYPES = [
  { id: 'shirt', name: 'Shirt', price: 600 },
  { id: 'pant', name: 'Pant', price: 700 },
  { id: 'suit_2piece', name: 'Suit (2-piece)', price: 6500 },
  { id: 'suit_3piece', name: 'Suit (3-piece)', price: 8500 },
  { id: 'panjabi', name: 'Panjabi', price: 900 },
  { id: 'payjama', name: 'Payjama', price: 700 },
];

// Sample fabric data (to be replaced with actual data from database)
// const FABRIC_SAMPLES = [
//   { code: 'FB-001', name: 'Premium Cotton', type: 'Shirting', stock: 15, buyingPrice: 850, sellingPrice: 1000 },
//   { code: 'FB-002', name: 'Italian Wool', type: 'Suiting', stock: 8, buyingPrice: 2400, sellingPrice: 2800 },
//   { code: 'FB-003', name: 'Linen Blend', type: 'Panjabi', stock: 12, buyingPrice: 1200, sellingPrice: 1400 },
// ];

interface OrderFormProps {
  onSubmit: (data: any) => void;
}

// interface ProductOrder {
//   productType: string;
//   quantity: number;
//   measurements: any[];
//   fabricTaken: boolean;
//   fabricCode?: string;
//   fabricPrice?: number;
// }
interface ProductOrder {
  product_type: string;
  quantity: number;
  measurements: any[];
  fabricTaken: boolean;
  fabric_id?: string;
  price?: number;
}

export const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const { toast } = useToast();
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [finalTotalAmount, setFinalTotalAmount] = useState<number>(0);
  const [dueAmount, setDueAmount] = useState<number>(0);
  const [products, setProducts] = useState<ProductOrder[]>([]);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [fabricSearchQuery, setFabricSearchQuery] = useState('');
  const [selectedFabric, setSelectedFabric] = useState<any>(null);
  const [FABRIC_SAMPLES, setFabricsData] = useState([]);
    
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
  
  const form = useForm({
    defaultValues: {
      customerName: '',
      // phone: '',
      status: 'Order Taken' as OrderStatus,
    }
  });

  // Get today's date for order date
  const orderDate = new Date();
  
  // Calculate due amount whenever paid amount or total amount changes
  useEffect(() => {
    setDueAmount(totalAmount - paidAmount);
  }, [totalAmount, paidAmount]);

  // Calculate total amount whenever products change
  useEffect(() => {
    const calculatedTotal = products.reduce((sum, product) => {
      const productType = PRODUCT_TYPES.find(type => type.id === product.product_type);
      const productPrice = productType ? productType.price * product.quantity : 0;
      const fabricPrice = product.fabricTaken && product.price ? product.price : 0;
      return sum + productPrice + fabricPrice;
    }, 0);
    
    setTotalAmount(calculatedTotal);
    setFinalTotalAmount(calculatedTotal);
  }, [products]);

  const handleAddProduct = () => {
    setProducts([...products, {
      product_type: '',
      quantity: 1,
      measurements: [],
      fabricTaken: false
    }]);
    setActiveProductIndex(products.length);
  };

  const handleProductTypeChange = (productIndex: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].product_type = value;
    updatedProducts[productIndex].measurements = Array(updatedProducts[productIndex].quantity).fill({});
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (productIndex: number, value: number) => {
    const updatedProducts = [...products];
    const currentProduct = updatedProducts[productIndex];
    const newQuantity = value;
    
    // If increasing quantity, add more empty measurement objects
    if (newQuantity > currentProduct.quantity) {
      const additionalMeasurements = Array(newQuantity - currentProduct.quantity).fill({});
      currentProduct.measurements = [...currentProduct.measurements, ...additionalMeasurements];
    } else {
      // If decreasing, remove excess measurement objects
      currentProduct.measurements = currentProduct.measurements.slice(0, newQuantity);
    }
    
    currentProduct.quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleMeasurementChange = (productIndex: number, itemIndex: number, measurements: any) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].measurements[itemIndex] = measurements;
    setProducts(updatedProducts);
  };

  const handleCopyPreviousMeasurements = (productIndex: number, itemIndex: number) => {
    if (itemIndex === 0) return; // No previous measurements to copy
    
    const updatedProducts = [...products];
    updatedProducts[productIndex].measurements[itemIndex] = {
      ...updatedProducts[productIndex].measurements[itemIndex - 1]
    };
    setProducts(updatedProducts);
    
    toast({
      title: "Measurements Copied",
      description: "Previous measurements have been copied to this item."
    });
  };

  const handleFabricTakenChange = (productIndex: number, value: boolean) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].fabricTaken = value;
    if (!value) {
      // If fabric not taken, clear fabric code and price
      updatedProducts[productIndex].fabric_id = undefined;
      updatedProducts[productIndex].price = undefined;
    }
    setProducts(updatedProducts);
  };

  const handleFabricCodeSelect = (productIndex: number, fabricCode: string) => {
    const fabric = FABRIC_SAMPLES.find(f => f.fabric_id === fabricCode);
    if (fabric) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].fabric_id = fabricCode;
      updatedProducts[productIndex].price = fabric.sellingPrice;
      setProducts(updatedProducts);
      setSelectedFabric(fabric);
    }
  };

  const filteredFabrics = FABRIC_SAMPLES.filter(fabric => 
    fabric.fabric_id.toLowerCase().includes(fabricSearchQuery.toLowerCase()) ||
    fabric.fabric_name.toLowerCase().includes(fabricSearchQuery.toLowerCase())
  );

  const handleSubmit = (formData: any) => {
    if (!deliveryDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a delivery date",
      });
      return;
    }

    if (products.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one product",
      });
      return;
    }

    // Check if all products have a selected product type
    const hasInvalidProducts = products.some(product => !product.product_type);
    if (hasInvalidProducts) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a product type for all products",
      });
      return;
    }

    // Generate a unique order ID (in real app, this would be handled by the backend)
    const orderId = `ORD-${Math.floor(Math.random() * 900) + 100}`;
    
    const orderData = {
      // id: orderId,
      customer_id:formData.customerName,

        // phone: formData.phone,
      products: products,
      order_date: orderDate.toISOString(),
      delivery_date: deliveryDate.toISOString(),
      order_status: formData.status,

        total_amount:totalAmount,
        paid_amount:paidAmount,
        due_amount: dueAmount,
        finalTotalAmount

    };

    onSubmit(orderData);
    
    toast({
      title: "Order Created",
      description: `Order ${orderId} has been created successfully.`,
    });
  };

  const generateSlip = (type: 'customer' | 'factory') => {
    toast({
      title: "Generating Slip",
      description: `${type === 'customer' ? 'Customer' : 'Factory'} slip is being generated.`,
    });
    // Implementation for generating PDF would go here
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Information</h3>
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter customer ID" 
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter phone number" 
                        type="tel"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <div>
                <Label>Order Date</Label>
                <div className="border rounded-md p-3 text-sm">
                  {format(orderDate, "PPP")}
                </div>
              </div>

              <div>
                <Label>Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Products</h3>
              <Button type="button" onClick={handleAddProduct} variant="outline">
                Add Product
              </Button>
            </div>

            {products.length === 0 ? (
              <div className="text-center p-6 bg-gray-50 rounded-md">
                <p className="text-gray-500">No products added. Click "Add Product" to start.</p>
              </div>
            ) : (
              <Tabs 
                value={activeProductIndex.toString()} 
                onValueChange={(value) => setActiveProductIndex(parseInt(value))}
              >
                <TabsList className="mb-4">
                  {products.map((product, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Product {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {products.map((product, productIndex) => (
                  <TabsContent key={productIndex} value={productIndex.toString()}>
                    <div className="space-y-4 p-4 border rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Product Type</Label>
                          <Select 
                            value={product.product_type}
                            onValueChange={(value) => handleProductTypeChange(productIndex, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                            <SelectContent>
                              {PRODUCT_TYPES.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(productIndex, parseInt(e.target.value) || 1)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Fabric Taken</Label>
                        <RadioGroup
                          value={product.fabricTaken ? "yes" : "no"}
                          onValueChange={(value) => handleFabricTakenChange(productIndex, value === "yes")}
                          className="flex space-x-4 mt-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id={`fabric-yes-${productIndex}`} />
                            <Label htmlFor={`fabric-yes-${productIndex}`}>Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id={`fabric-no-${productIndex}`} />
                            <Label htmlFor={`fabric-no-${productIndex}`}>No</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {product.fabricTaken && (
                        <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                          <div>
                            <Label>Search Fabric Code</Label>
                            <Input
                              placeholder="Search by fabric code or name"
                              value={fabricSearchQuery}
                              onChange={(e) => setFabricSearchQuery(e.target.value)}
                            />
                          </div>

                          <div className="max-h-40 overflow-y-auto">
                            <table className="min-w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                  <th className="px-4 py-2 text-right"></th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {filteredFabrics.map((fabric) => (
                                  <tr key={fabric.fabric_id} className={fabric.fabric_id === product.fabric_id ? 'bg-blue-50' : ''}>
                                    <td className="px-4 py-2 whitespace-nowrap">{fabric.fabric_id}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{fabric.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{fabric.type}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{fabric.stock}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">৳{fabric.sellingPrice}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-right">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleFabricCodeSelect(productIndex, fabric.fabric_id)}
                                      >
                                        Select
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {product.fabric_id && (
                            <div className="mt-2">
                              <Label>Selected Fabric</Label>
                              <div className="p-2 bg-white border rounded">
                                <p className="font-medium">{selectedFabric?.name} ({product.fabric_id})</p>
                                <p className="text-sm text-gray-600">Price: ৳{product.price}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {product.product_type && product.quantity > 0 && (
                        <div className="space-y-4 mt-4">
                          <h4 className="font-medium">Measurements</h4>
                          
                          {product.measurements.map((_, itemIndex) => (
                            <div key={itemIndex} className="p-4 border rounded-md bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">Item {itemIndex + 1}</h5>
                                {itemIndex > 0 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleCopyPreviousMeasurements(productIndex, itemIndex)}
                                  >
                                    Copy Previous
                                  </Button>
                                )}
                              </div>
                              <ProductMeasurements
                                productType={product.product_type}
                                value={product.measurements[itemIndex]}
                                onChange={(measurements) => handleMeasurementChange(productIndex, itemIndex, measurements)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Total Amount (৳)</Label>
                <Input 
                  type="number" 
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="font-medium"
                />
              </div>
              
              <div>
                <Label>Paid Amount (৳)</Label>
                <Input 
                  type="number" 
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label>Due Amount (৳)</Label>
                <Input 
                  type="number"
                  value={dueAmount}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label>Final Total Amount (৳)</Label>
                <Input 
                  type="number"
                  value={finalTotalAmount}
                  onChange={(e) => setFinalTotalAmount(Number(e.target.value))}
                  className="font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="submit" variant="success">
              Create Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
