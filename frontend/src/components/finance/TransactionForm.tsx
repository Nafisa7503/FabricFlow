import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { postTransaction } from "../../services/api"; // Import the correct API function

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

// Transaction categories and payment methods
const TRANSACTION_CATEGORIES = ["sales", "salary", "rent", "utilities", "inventory", "other"];
const PAYMENT_METHODS = ["cash", "card", "bankTransfer"];

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onTransactionAdded: () => void; // Function to refresh transactions after submission
}

export const TransactionForm = ({ open, onClose, onTransactionAdded }: TransactionFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());

  // Form state
  const [formData, setFormData] = useState({
    description: "",
    category: "sales",
    type: "income",
    amount: "",
    paymentMethod: "cash",
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!transactionDate || !formData.description || !formData.amount) {
      toast({ variant: "destructive", title: t("error"), description: t("fillRequiredFields") });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({ variant: "destructive", title: t("error"), description: t("invalidAmount") });
      return;
    }

    // Prepare transaction data for backend
    const transactionData = {
      date: transactionDate.toISOString().split("T")[0],
      description: formData.description,
      category: formData.category,
      type: formData.type,
      amount: amount,
      payment_method: formData.paymentMethod,
    };

    setLoading(true); // Show loading state

    try {
      await postTransaction(transactionData); // Send data to API
      toast({ title: t("success"), description: t("transactionAdded") });

      onTransactionAdded(); // Refresh transactions
      onClose(); // Close modal

      // Reset form
      setFormData({ description: "", category: "sales", type: "income", amount: "", paymentMethod: "cash" });
      setTransactionDate(new Date());
    } catch (error) {
      console.error("Transaction submission error:", error);
      toast({ variant: "destructive", title: t("error"), description: t("submissionFailed") });
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t("addNewTransaction")}</DialogTitle>
          <DialogDescription>{t("addNewTransactionDesc")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Transaction Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t("transactionDate")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {transactionDate ? format(transactionDate, "PPP") : <span>{t("pickDate")}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={transactionDate} onSelect={(date) => date && setTransactionDate(date)} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t("description")}</label>
            <Input
              placeholder={t("enterDescription")}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t("category")}</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger><SelectValue placeholder={t("selectCategory")} /></SelectTrigger>
                <SelectContent>
                  {TRANSACTION_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>{t(category as any)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t("type")}</label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">{t("income")}</SelectItem>
                  <SelectItem value="expense">{t("expense")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amount & Payment Method */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t("amount")}</label>
              <Input
                type="number"
                placeholder={t("enterAmount")}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{t("paymentMethod")}</label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>{t(method as any)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>{t("cancel")}</Button>
            <Button type="submit" disabled={loading}>{loading ? t("submitting") : t("confirm")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
