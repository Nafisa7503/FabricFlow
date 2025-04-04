
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { postProducts} from "../../services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const InventoryForm = ({ open, onClose, onSubmit }: InventoryFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Shirting',
    color: '',
    pattern: '',
    available: '',
    price: '',
    quality: 'Standard',
    supplier: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.color || !formData.available || !formData.price) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('fillRequiredFields'),
      });
      return;
    }

    // Create new fabric entry
    const fabricData = {
      // id: `FB-${Math.floor(Math.random() * 900) + 100}`,
      fabric_name: formData.name,
      fabric_type: formData.type,
      color: formData.color,
      pattern: formData.pattern || 'Solid',
      quantity: formData.available, 
      price: formData.price,
      quality: formData.quality,
      // supplier: formData.supplier || 'Local Supplier',
    };

    // Submit the data
    try {
      // Call the postTransactions method to submit the form data
      await postProducts(fabricData);
      

  
      onSubmit(fabricData);
      onClose();
  
      setFormData({
      name: '',
      type: 'Shirting',
      color: '',
      pattern: '',
      available: '',
      price: '',
      quality: 'Standard',
      supplier: '',
    }); 
    } catch (error) {

    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('addNewFabric')}</DialogTitle>
          <DialogDescription>
            {t('addNewFabricDesc')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fabricName')}</label>
              <Input 
                placeholder={t('enterFabricName')}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fabricType')}</label>
              <Select 
                value={formData.type}
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectFabricType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shirting">{t('shirting')}</SelectItem>
                  <SelectItem value="Suiting">{t('suiting')}</SelectItem>
                  <SelectItem value="Panjabi">{t('panjabi')}</SelectItem>
                  <SelectItem value="Sherwani">{t('sherwani')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('color')}</label>
              <Input 
                placeholder={t('enterColor')}
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('pattern')}</label>
              <Input 
                placeholder={t('enterPattern')}
                value={formData.pattern}
                onChange={(e) => setFormData({...formData, pattern: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('available')}</label>
              <Input 
                type="number"
                placeholder={t('enterQuantity')}
                value={formData.available}
                onChange={(e) => setFormData({...formData, available: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('price')}</label>
              <Input 
                type="number"
                placeholder={t('enterPrice')}
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('quality')}</label>
              <Select 
                value={formData.quality}
                onValueChange={(value) => setFormData({...formData, quality: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">{t('standard')}</SelectItem>
                  <SelectItem value="Premium">{t('premium')}</SelectItem>
                  <SelectItem value="Luxury">{t('luxury')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('supplier')}</label>
              <Input 
                placeholder={t('enterSupplier')}
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('confirm')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
