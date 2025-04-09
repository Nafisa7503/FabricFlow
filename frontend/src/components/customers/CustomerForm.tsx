
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { postCustomers} from "../../services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CustomerForm = ({ open, onClose, onSubmit }: CustomerFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    favoriteProducts: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('namePhoneRequired'),
      });
      return;
    }

    // Create new customer data
    const customerData = {
      // customer_id: `CUS-${Math.floor(Math.random() * 900) + 100}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'Not provided',
      address: formData.address || 'Not provided',
      lastPurchase: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: '৳0',
      most_purchased: formData.favoriteProducts || 'Not specified',
    };

    // Submit the data
    try {
      // Call the postTransactions method to submit the form data
      await postCustomers(customerData);
      

  
      onSubmit(customerData);
      onClose();
  
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      favoriteProducts: '',
    }); 
    } catch (error) {

    };

  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('addNewCustomer')}</DialogTitle>
          <DialogDescription>
            {t('addNewCustomerDesc')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('customerName')}</label>
            <Input 
              placeholder={t('enterCustomerName')}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('phoneNumber')}</label>
            <Input 
              placeholder={t('enterPhoneNumber')}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('email')}</label>
            <Input 
              type="email"
              placeholder={t('enterEmail')}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('address')}</label>
            <Input 
              placeholder={t('enterAddress')}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('favoriteProducts')}</label>
            <Textarea 
              placeholder={t('enterFavoriteProducts')}
              value={formData.favoriteProducts}
              onChange={(e) => setFormData({...formData, favoriteProducts: e.target.value})}
              className="resize-none"
              rows={3}
            />
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
