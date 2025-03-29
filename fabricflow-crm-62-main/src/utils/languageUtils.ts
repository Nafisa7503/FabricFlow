
export type TranslationKey = 
  | 'dashboard'
  | 'welcome'
  | 'dailySales'
  | 'dailyExpenses'
  | 'inventorySearch'
  | 'addSale'
  | 'addCustomer'
  | 'addExpense'
  | 'recentOrders'
  | 'viewAll'
  | 'trackOrders'
  | 'orderManagement'
  | 'createOrder'
  | 'gridView'
  | 'listView'
  | 'searchOrders'
  | 'trackInventory'
  | 'inventoryManagement'
  | 'addNewItem'
  | 'fabrics'
  | 'accessories'
  | 'readyMade'
  | 'suppliers'
  | 'fabricName'
  | 'fabricType'
  | 'available'
  | 'success'
  | 'editing'
  | 'deleted'
  | 'stockUpdated'
  | 'searchByFabricCode'
  | 'buyingPrice'
  | 'sellingPrice'
  | 'actions'
  | 'pieces'
  | 'addStock'
  | 'edit'
  | 'delete'
  | 'confirmDelete'
  | 'hasBeenDeleted'
  | 'stockUpdatedTo'
  | 'fabric'
  | 'addedSuccessfully'
  | 'noAccessoriesYet'
  | 'startAddingAccessories'
  | 'addAccessories'
  | 'noReadyMadeYet'
  | 'startAddingProducts'
  | 'addProducts'
  | 'noSuppliersYet'
  | 'startAddingSuppliers'
  | 'addSupplier';

interface Translations {
  [key: string]: {
    [key in TranslationKey]: string;
  };
}

export const translations: Translations = {
  'en': {
    dashboard: 'Dashboard',
    welcome: 'Welcome to your tailoring management dashboard',
    dailySales: 'Daily Sales',
    dailyExpenses: 'Daily Expenses',
    inventorySearch: 'Search Fabric',
    addSale: 'Add Sale',
    addCustomer: 'Add Customer',
    addExpense: 'Add Expense',
    recentOrders: 'Recent Orders',
    viewAll: 'View All',
    trackOrders: 'Track and manage your tailoring orders',
    orderManagement: 'Order Management',
    createOrder: 'Create Order',
    gridView: 'Grid View',
    listView: 'List View',
    searchOrders: 'Search orders...',
    trackInventory: 'Track and manage your inventory items',
    inventoryManagement: 'Inventory Management',
    addNewItem: 'Add New Item',
    fabrics: 'Fabrics',
    accessories: 'Accessories',
    readyMade: 'Ready Made',
    suppliers: 'Suppliers',
    fabricName: 'Fabric Name',
    fabricType: 'Fabric Type',
    available: 'Available',
    success: 'Success',
    editing: 'Editing',
    deleted: 'Deleted',
    stockUpdated: 'Stock Updated',
    searchByFabricCode: 'Search by fabric code or name',
    buyingPrice: 'Buying Price',
    sellingPrice: 'Selling Price',
    actions: 'Actions',
    pieces: 'pieces',
    addStock: 'Add Stock',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this item?',
    hasBeenDeleted: 'has been deleted',
    stockUpdatedTo: 'stock updated to',
    fabric: 'Fabric',
    addedSuccessfully: 'added successfully',
    noAccessoriesYet: 'No Accessories Yet',
    startAddingAccessories: 'Start adding accessories to your inventory',
    addAccessories: 'Add Accessories',
    noReadyMadeYet: 'No Ready Made Products Yet',
    startAddingProducts: 'Start adding ready-made products to your inventory',
    addProducts: 'Add Products',
    noSuppliersYet: 'No Suppliers Yet',
    startAddingSuppliers: 'Start adding suppliers to your list',
    addSupplier: 'Add Supplier'
  },
  'bn': {
    dashboard: 'ড্যাশবোর্ড',
    welcome: 'আপনার টেইলরিং ম্যানেজমেন্ট ড্যাশবোর্ডে স্বাগতম',
    dailySales: 'দৈনিক বিক্রয়',
    dailyExpenses: 'দৈনিক খরচ',
    inventorySearch: 'কাপড় খোঁজ করুন',
    addSale: 'বিক্রয় যোগ করুন',
    addCustomer: 'কাস্টমার যোগ করুন',
    addExpense: 'খরচ যোগ করুন',
    recentOrders: 'সাম্প্রতিক অর্ডার',
    viewAll: 'সব দেখুন',
    trackOrders: 'আপনার টেইলরিং অর্ডারগুলি ট্র্যাক এবং পরিচালনা করুন',
    orderManagement: 'অর্ডার ম্যানেজমেন্ট',
    createOrder: 'অর্ডার তৈরি করুন',
    gridView: 'গ্রিড ভিউ',
    listView: 'লিস্ট ভিউ',
    searchOrders: 'অর্ডার খুঁজুন...',
    trackInventory: 'আপনার ইনভেন্টরি আইটেমগুলি ট্র্যাক এবং পরিচালনা করুন',
    inventoryManagement: 'ইনভেন্টরি ম্যানেজমেন্ট',
    addNewItem: 'নতুন আইটেম যোগ করুন',
    fabrics: 'কাপড়',
    accessories: 'এক্সেসরিজ',
    readyMade: 'রেডিমেড',
    suppliers: 'সরবরাহকারী',
    fabricName: 'কাপড়ের নাম',
    fabricType: 'কাপড়ের ধরন',
    available: 'উপলব্ধ',
    success: 'সফল',
    editing: 'সম্পাদনা',
    deleted: 'মুছে ফেলা হয়েছে',
    stockUpdated: 'স্টক আপডেট হয়েছে',
    searchByFabricCode: 'কাপড়ের কোড বা নাম দিয়ে সার্চ করুন',
    buyingPrice: 'ক্রয় মূল্য',
    sellingPrice: 'বিক্রয় মূল্য',
    actions: 'অ্যাকশন',
    pieces: 'পিস',
    addStock: 'স্টক যোগ করুন',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    confirmDelete: 'আপনি কি নিশ্চিত যে আপনি এই আইটেমটি মুছতে চান?',
    hasBeenDeleted: 'মুছে ফেলা হয়েছে',
    stockUpdatedTo: 'স্টক আপডেট হয়েছে',
    fabric: 'কাপড়',
    addedSuccessfully: 'সফলভাবে যোগ করা হয়েছে',
    noAccessoriesYet: 'এখনও কোন এক্সেসরিজ নেই',
    startAddingAccessories: 'আপনার ইনভেন্টরিতে এক্সেসরিজ যোগ করা শুরু করুন',
    addAccessories: 'এক্সেসরিজ যোগ করুন',
    noReadyMadeYet: 'এখনও কোন রেডিমেড পণ্য নেই',
    startAddingProducts: 'আপনার ইনভেন্টরিতে রেডিমেড পণ্য যোগ করা শুরু করুন',
    addProducts: 'পণ্য যোগ করুন',
    noSuppliersYet: 'এখনও কোন সরবরাহকারী নেই',
    startAddingSuppliers: 'আপনার তালিকায় সরবরাহকারী যোগ করা শুরু করুন',
    addSupplier: 'সরবরাহকারী যোগ করুন'
  }
};
