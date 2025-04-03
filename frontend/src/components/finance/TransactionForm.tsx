
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { getTransactions} from "../../services/api";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TRANSACTION_CATEGORIES = [
  'sales',
  'salary',
  'rent',
  'utilities',
  'inventory',
  'other'
];

const PAYMENT_METHODS = [
  'cash',
  'card',
  'bankTransfer'
];

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const TransactionForm = ({ open, onClose, onSubmit }: TransactionFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    description: '',
    category: 'sales',
    type: 'income',
    amount: '',
    paymentMethod: 'cash'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionDate || !formData.description || !formData.amount) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('fillRequiredFields'),
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('invalidAmount'),
      });
      return;
    }

    const transactionData = {
      // id: `TRX-${Math.floor(Math.random() * 900) + 100}`,
      date: transactionDate.toISOString().split('T')[0],
      description: formData.description,
      category: formData.category,
      type: formData.type,
      // amount: `৳${amount.toLocaleString()}`,
      amount: amount,
      payment_method: formData.paymentMethod,
    };

    onSubmit(transactionData);
    onClose();
    
    // Reset form
    setFormData({
      description: '',
      category: 'sales',
      type: 'income',
      amount: '',
      paymentMethod: 'cash'
    });
    setTransactionDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('addNewTransaction')}</DialogTitle>
          <DialogDescription>
            {t('addNewTransactionDesc')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('transactionDate')}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {transactionDate ? format(transactionDate, "PPP") : <span>{t('pickDate')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={transactionDate}
                  onSelect={(date) => date && setTransactionDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t('description')}</label>
            <Input 
              placeholder={t('enterDescription')}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('category')}</label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTION_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {t(category as any)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('type')}</label>
              <Select 
                value={formData.type}
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">{t('income')}</SelectItem>
                  <SelectItem value="expense">{t('expense')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('amount')}</label>
              <Input 
                type="number" 
                placeholder={t('enterAmount')}
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t('paymentMethod')}</label>
              <Select 
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {t(method as any)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
