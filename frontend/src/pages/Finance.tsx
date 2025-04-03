
import { useState,useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTransactions} from "../services/api";
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  DollarSign, 
  Calendar,
  BarChart3,
  LineChart,
  CreditCard,
  Wallet
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TransactionForm } from '@/components/finance/TransactionForm';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample data for financial transactions



// Sample data for pie chart
const pieChartData = [
  { name: 'Sales', value: 28000, color: '#4ade80' },
  { name: 'Inventory', value: 24000, color: '#f97316' },
  { name: 'Salary', value: 18000, color: '#8b5cf6' },
  { name: 'Rent', value: 35000, color: '#ec4899' },
  { name: 'Utilities', value: 5800, color: '#60a5fa' },
];

// Sample data for bar chart
const barChartData = [
  { name: 'Sep 4', income: 15000, expense: 12000 },
  { name: 'Sep 5', income: 18000, expense: 14000 },
  { name: 'Sep 6', income: 9500, expense: 35000 },
  { name: 'Sep 7', income: 1800, expense: 0 },
  { name: 'Sep 8', income: 0, expense: 23800 },
  { name: 'Sep 9', income: 4200, expense: 24000 },
  { name: 'Sep 10', income: 12500, expense: 0 },
];

// Transaction type badge
const TransactionTypeBadge = ({ type }: { type: string }) => {
  const isIncome = type === 'Income';
  
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isIncome ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {type}
    </div>
  );
};

const Finance = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  // const [transactionsData, setTransactionsData] = useState(initialTransactionsData);
  const [transactionsData, setTransactionsData] = useState([]);

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      console.log(data)
      setTransactionsData(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  fetchTransactions();
}, []);

  const handleAddTransaction = (newTransaction: any) => {
    setTransactionsData([newTransaction, ...transactionsData]);
    toast({
      title: t('success'),
      description: t('transactionAdded'),
    });
  };
  
  const filteredTransactions = transactionsData.filter((transaction) =>
    transaction?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction?.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction?.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  
  // Calculate totals
  const totalIncome = transactionsData
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amountValue, 0);
    
  const totalExpense = transactionsData
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amountValue, 0);
    
  const netProfit = totalIncome - totalExpense;
  
  return (
    <div className="min-h-screen bg-tailoring-50">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-tailoring-950">{t('financialManagement')}</h1>
            <p className="text-tailoring-600 mt-1">{t('financialDashboard')}</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddingTransaction(true)}
          >
            <Plus className="h-4 w-4" />
            {t('addTransaction')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
          <Card className="p-5 border border-border shadow-subtle">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-100">
                <ArrowUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-tailoring-600">{t('income')}</p>
                <p className="text-2xl font-bold text-tailoring-900">৳{totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 border border-border shadow-subtle">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-red-100">
                <ArrowDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-tailoring-600">{t('expense')}</p>
                <p className="text-2xl font-bold text-tailoring-900">৳{totalExpense.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 border border-border shadow-subtle">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-tailoring-600">{t('amount')}</p>
                <p className={`text-2xl font-bold ${
                  netProfit >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ৳{netProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions" className="animate-fade-in-up">
          <TabsList className="mb-6">
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {t('addTransaction')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t('reports') || 'Reports'}
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              {t('accounts') || 'Accounts'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="animate-fade-in">
            <div className="bg-white rounded-lg border border-border shadow-subtle p-5 mb-8">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tailoring-400 h-4 w-4" />
                  <Input 
                    placeholder={t('searchTransactions')}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    {t('dateRange') || 'Date Range'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="table-wrapper animate-fade-in">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('transactionDate')}</th>
                    <th>{t('description')}</th>
                    <th>{t('category')}</th>
                    <th>{t('type')}</th>
                    <th>{t('amount')}</th>
                    <th>{t('paymentMethod')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="font-medium text-tailoring-900">{transaction.id}</td>
                      <td>{new Date(transaction.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <span className="px-2 py-1 rounded-full bg-tailoring-100 text-tailoring-800 text-xs">
                          {transaction.category}
                        </span>
                      </td>
                      <td><TransactionTypeBadge type={transaction.type} /></td>
                      <td className={transaction.type === 'Income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {transaction.amount}
                      </td>
                      <td>{transaction.paymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-border shadow-subtle p-5">
                <h3 className="text-lg font-semibold text-tailoring-900 mb-6">{t('expense')} {t('breakdown') || 'Breakdown'}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `৳${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-border shadow-subtle p-5">
                <h3 className="text-lg font-semibold text-tailoring-900 mb-6">{t('weekly') || 'Weekly'} {t('financialPerformance') || 'Financial Performance'}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `৳${value}`} />
                      <Legend />
                      <Bar dataKey="income" name={t('income')} fill="#4ade80" />
                      <Bar dataKey="expense" name={t('expense')} fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accounts">
            <div className="bg-white rounded-lg border border-border shadow-subtle p-8 text-center">
              <Wallet className="h-12 w-12 mx-auto text-tailoring-300" />
              <h3 className="mt-4 text-xl font-medium text-tailoring-900">{t('accountsManagement') || 'Accounts Management'} {t('comingSoon') || 'Coming Soon'}</h3>
              <p className="mt-2 text-tailoring-600">{t('trackAccounts') || 'Track your bank accounts, cash balances, and payment methods'}</p>
              <Button className="mt-4">{t('exploreTransactions') || 'Explore Transactions'}</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {isAddingTransaction && (
          <TransactionForm 
            open={isAddingTransaction}
            onClose={() => setIsAddingTransaction(false)}
            onSubmit={handleAddTransaction}
          />
        )}
      </main>
    </div>
  );
};

export default Finance;
