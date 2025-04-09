import React, { createContext, useContext, useState, useEffect } from 'react';

type TranslationKey = 
  | 'dashboard' 
  | 'inventory'
  | 'customers'
  | 'orders'
  | 'finance'
  | 'fabrics'
  | 'accessories'
  | 'readyMade'
  | 'suppliers'
  | 'noAccessoriesYet'
  | 'startAddingAccessories'
  | 'addAccessories'
  | 'noReadyMadeYet'
  | 'startAddingProducts'
  | 'addProducts'
  | 'noSuppliersYet'
  | 'startAddingSuppliers'
  | 'addSupplier'
  | 'addSale'
  | 'checkStock'
  | 'searchInventory'
  | 'newOrder'
  | 'addCustomer'
  | 'dailySales'
  | 'dailyExpenses'
  | 'totalSales'
  | 'totalCustomers'
  | 'newOrders'
  | 'inventoryItems'
  | 'welcome'
  | 'cancel'
  | 'confirm'
  | 'error'
  | 'success'
  | 'fillRequiredFields'
  | 'customerAdded'
  | 'fabricAdded'
  | 'transactionAdded'
  | 'invalidAmount'
  | 'namePhoneRequired'
  | 'addNewCustomer'
  | 'addNewCustomerDesc'
  | 'customerName'
  | 'enterCustomerName'
  | 'phoneNumber'
  | 'enterPhoneNumber'
  | 'email'
  | 'enterEmail'
  | 'address'
  | 'enterAddress'
  | 'favoriteProducts'
  | 'enterFavoriteProducts'
  | 'addFabric'
  | 'addNewFabric'
  | 'addNewFabricDesc'
  | 'fabricName'
  | 'enterFabricName'
  | 'fabricType'
  | 'selectFabricType'
  | 'shirting'
  | 'suiting'
  | 'panjabi'
  | 'sherwani'
  | 'color'
  | 'enterColor'
  | 'pattern'
  | 'enterPattern'
  | 'available'
  | 'enterQuantity'
  | 'price'
  | 'enterPrice'
  | 'quality'
  | 'standard'
  | 'premium'
  | 'luxury'
  | 'supplier'
  | 'enterSupplier'
  | 'addTransaction'
  | 'addNewTransaction'
  | 'addNewTransactionDesc'
  | 'transactionDate'
  | 'pickDate'
  | 'description'
  | 'enterDescription'
  | 'category'
  | 'selectCategory'
  | 'sales'
  | 'salary'
  | 'rent'
  | 'utilities'
  | 'type'
  | 'income'
  | 'expense'
  | 'amount'
  | 'enterAmount'
  | 'paymentMethod'
  | 'cash'
  | 'card'
  | 'bankTransfer'
  | 'orderHistory'
  | 'preferences'
  | 'customerPreferences'
  | 'lastPurchase'
  | 'noPreferencesYet'
  | 'noPurchaseYet'
  | 'notes'
  | 'noNotesYet'
  | 'totalSpent'
  | 'orderTaken'
  | 'sentToFactory'
  | 'readyForPickup'
  | 'delivered'
  | 'sendWishes'
  | 'sendOffer'
  | 'whatsappMessage'
  | 'birthdayMessage'
  | 'specialOfferMessage'
  | 'restock'
  | 'addNewItem'
  | 'viewProfile'
  | 'orderManagement'
  | 'customerManagement'
  | 'inventoryManagement'
  | 'financialManagement'
  | 'trackInventory'
  | 'trackOrders'
  | 'trackCustomers'
  | 'createOrder'
  | 'financialDashboard'
  | 'totalOrders'
  | 'totalPayments'
  | 'pendingAmounts'
  | 'orderValue'
  | 'ordersByStatus'
  | 'orderValueByStatus'
  | 'searchOrders'
  | 'searchCustomers'
  | 'searchFabrics'
  | 'searchTransactions'
  | 'gridView'
  | 'listView'
  | 'addNewProductType'
  | 'addNewProductTypeDesc'
  | 'productId'
  | 'productName'
  | 'internalIdentifier'
  | 'displayName'
  | 'createNewProductType'
  | 'productAdded'
  | 'date'
  | 'product'
  | 'status'
  | 'additionalPreferences'
  | 'addNote'
  | 'reports'
  | 'accounts'
  | 'dateRange'
  | 'breakdown'
  | 'weekly'
  | 'financialPerformance'
  | 'accountsManagement'
  | 'comingSoon'
  | 'trackAccounts'
  | 'exploreTransactions'
  | 'other'
  | 'pending'
  | 'fabric'
  | 'addedSuccessfully'
  | 'editing'
  | 'confirmDelete'
  | 'deleted'
  | 'hasBeenDeleted'
  | 'stockUpdated'
  | 'stockUpdatedTo'
  | 'searchByFabricCode'
  | 'buyingPrice'
  | 'sellingPrice'
  | 'actions'
  | 'pieces'
  | 'addStock'
  | 'edit'
  | 'delete';

const translations: Record<'en' | 'bn', Record<TranslationKey, string>> = {
  en: {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    customers: 'Customers',
    orders: 'Orders',
    finance: 'Finance',
    fabrics: 'Fabrics',
    accessories: 'Accessories',
    readyMade: 'Ready Made',
    suppliers: 'Suppliers',
    noAccessoriesYet: 'No accessories added yet',
    startAddingAccessories: 'Start adding accessories to your inventory',
    addAccessories: 'Add Accessories',
    noReadyMadeYet: 'No ready-made items added yet',
    startAddingProducts: 'Start adding ready-made products',
    addProducts: 'Add Products',
    noSuppliersYet: 'No suppliers added yet',
    startAddingSuppliers: 'Start adding your suppliers',
    addSupplier: 'Add Supplier',
    addSale: 'Add Sale',
    checkStock: 'Check Stock',
    searchInventory: 'Search Inventory',
    newOrder: 'New Order',
    addCustomer: 'Add Customer',
    dailySales: 'Daily Sales',
    dailyExpenses: 'Daily Expenses',
    totalSales: 'Total Sales',
    totalCustomers: 'Total Customers',
    newOrders: 'Active Orders',
    inventoryItems: 'Inventory Items',
    welcome: 'Welcome back to Pentagon - weave your style!',
    cancel: 'Cancel',
    confirm: 'Confirm',
    error: 'Error',
    success: 'Success',
    fillRequiredFields: 'Please fill all required fields',
    customerAdded: 'Customer added successfully',
    fabricAdded: 'Fabric added successfully',
    transactionAdded: 'Transaction added successfully',
    invalidAmount: 'Please enter a valid amount',
    namePhoneRequired: 'Name and phone number are required',
    addNewCustomer: 'Add New Customer',
    addNewCustomerDesc: 'Add customer details to keep track of your clients',
    customerName: 'Customer Name',
    enterCustomerName: 'Enter customer name',
    phoneNumber: 'Phone Number',
    enterPhoneNumber: 'Enter phone number',
    email: 'Email',
    enterEmail: 'Enter email address',
    address: 'Address',
    enterAddress: 'Enter address',
    favoriteProducts: 'Favorite Products',
    enterFavoriteProducts: 'Enter favorite products or preferences',
    addFabric: 'Add Fabric',
    addNewFabric: 'Add New Fabric',
    addNewFabricDesc: 'Add new fabric to your inventory',
    fabricName: 'Fabric Name',
    enterFabricName: 'Enter fabric name',
    fabricType: 'Fabric Type',
    selectFabricType: 'Select fabric type',
    shirting: 'Shirting',
    suiting: 'Suiting',
    panjabi: 'Panjabi',
    sherwani: 'Sherwani',
    color: 'Color',
    enterColor: 'Enter color',
    pattern: 'Pattern',
    enterPattern: 'Enter pattern',
    available: 'Available',
    enterQuantity: 'Enter quantity',
    price: 'Price',
    enterPrice: 'Enter price',
    quality: 'Quality',
    standard: 'Standard',
    premium: 'Premium',
    luxury: 'Luxury',
    supplier: 'Supplier',
    enterSupplier: 'Enter supplier',
    addTransaction: 'Add Transaction',
    addNewTransaction: 'Add New Transaction',
    addNewTransactionDesc: 'Add a new financial transaction',
    transactionDate: 'Transaction Date',
    pickDate: 'Pick a date',
    description: 'Description',
    enterDescription: 'Enter description',
    category: 'Category',
    selectCategory: 'Select category',
    sales: 'Sales',
    salary: 'Salary',
    rent: 'Rent',
    utilities: 'Utilities',
    type: 'Type',
    income: 'Income',
    expense: 'Expense',
    amount: 'Amount',
    enterAmount: 'Enter amount',
    paymentMethod: 'Payment Method',
    cash: 'Cash',
    card: 'Card',
    bankTransfer: 'Bank Transfer',
    orderHistory: 'Order History',
    preferences: 'Preferences',
    customerPreferences: 'Customer Preferences',
    lastPurchase: 'Last Purchase',
    noPreferencesYet: 'No preferences recorded yet',
    noPurchaseYet: 'No purchase recorded yet',
    notes: 'Notes',
    noNotesYet: 'No notes added yet',
    totalSpent: 'Total Spent',
    orderTaken: 'Order Taken',
    sentToFactory: 'Sent to Factory',
    readyForPickup: 'Ready for Pickup',
    delivered: 'Delivered',
    sendWishes: 'Send Wishes',
    sendOffer: 'Send Offer',
    whatsappMessage: 'Send WhatsApp Message',
    birthdayMessage: 'Happy Birthday! Celebrate with a new outfit - 10% off your next purchase!',
    specialOfferMessage: 'We miss you! Enjoy 15% off your next purchase. Visit us soon!',
    restock: 'Restock',
    addNewItem: 'Add New Item',
    viewProfile: 'View Profile',
    orderManagement: 'Order Management',
    customerManagement: 'Customer Management',
    inventoryManagement: 'Inventory Management',
    financialManagement: 'Financial Management',
    trackInventory: 'Track and manage your fabric inventory',
    trackOrders: 'Manage tailoring orders and track their progress',
    trackCustomers: 'Manage your customer relationships and history',
    createOrder: 'Create Order',
    financialDashboard: 'Financial Dashboard',
    totalOrders: 'Total Orders',
    totalPayments: 'Total Payments',
    pendingAmounts: 'Pending Amounts',
    orderValue: 'Order Value',
    ordersByStatus: 'Orders by Status',
    orderValueByStatus: 'Order Value by Status',
    searchOrders: 'Search orders...',
    searchCustomers: 'Search customers...',
    searchFabrics: 'Search fabrics...',
    searchTransactions: 'Search transactions...',
    gridView: 'Grid View',
    listView: 'List View',
    addNewProductType: 'Add New Product Type',
    addNewProductTypeDesc: 'Create a new product type for tailoring orders',
    productId: 'Product ID',
    productName: 'Product Name',
    internalIdentifier: 'This will be used as an internal identifier',
    displayName: 'This is the display name customers will see',
    createNewProductType: 'Create New Product Type',
    productAdded: 'Product type added successfully',
    date: 'Date',
    product: 'Product',
    status: 'Status',
    additionalPreferences: 'Additional Preferences',
    addNote: 'Add Note',
    reports: 'Reports',
    accounts: 'Accounts',
    dateRange: 'Date Range',
    breakdown: 'Breakdown',
    weekly: 'Weekly',
    financialPerformance: 'Financial Performance',
    accountsManagement: 'Accounts Management',
    comingSoon: 'Coming Soon',
    trackAccounts: 'Track your bank accounts, cash balances, and payment methods',
    exploreTransactions: 'Explore Transactions',
    other: 'Other',
    pending: 'Pending',
    fabric: 'Fabric',
    addedSuccessfully: 'added successfully',
    editing: 'Editing',
    confirmDelete: 'Are you sure you want to delete this item?',
    deleted: 'Deleted',
    hasBeenDeleted: 'has been deleted',
    stockUpdated: 'Stock Updated',
    stockUpdatedTo: 'stock updated to',
    searchByFabricCode: 'Search by fabric code or name',
    buyingPrice: 'Buying Price',
    sellingPrice: 'Selling Price',
    actions: 'Actions',
    pieces: 'pieces',
    addStock: 'Add Stock',
    edit: 'Edit',
    delete: 'Delete'
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    inventory: 'ইনভেন্টরি',
    customers: 'গ্রাহক',
    orders: 'অর্ডার',
    finance: 'অর্থ',
    fabrics: 'কাপড়',
    accessories: 'এক্সেসরিজ',
    readyMade: 'রেডিমেড',
    suppliers: 'সরবরাহকারী',
    noAccessoriesYet: 'এখনও কোন এক্সেসরিজ যোগ করা হয়নি',
    startAddingAccessories: 'আপনার ইনভেন্টরিতে এক্সেসরিজ যোগ করা শুরু করুন',
    addAccessories: 'এক্সেসরিজ যোগ করুন',
    noReadyMadeYet: 'এখনও কোন রেডিমেড আইটেম যোগ করা হয়নি',
    startAddingProducts: 'রেডিমেড পণ্য যোগ করা শুরু করুন',
    addProducts: 'পণ্য যোগ করুন',
    noSuppliersYet: 'এখনও কোন সরবরাহকারী যোগ করা হয়নি',
    startAddingSuppliers: 'আপনার সরবরাহকারী যোগ করা শুরু করুন',
    addSupplier: 'সরবরাহকারী যোগ করুন',
    addSale: 'বিক্রয় যোগ করুন',
    checkStock: 'স্টক চেক করুন',
    searchInventory: 'ইনভেন্টরি অনুসন্ধান করুন',
    newOrder: 'নতুন অর্ডার',
    addCustomer: 'নতুন গ্রাহক',
    dailySales: 'দৈনিক বিক্রয়',
    dailyExpenses: 'দৈনিক খরচ',
    totalSales: 'মোট বিক্রয়',
    totalCustomers: 'মোট গ্রাহক',
    newOrders: 'নতুন অর্ডার',
    inventoryItems: 'ইনভেন্টরি আইটেম',
    welcome: 'পেন্টাগন - আপনার স্টাইল বুনুন! এ আবারও স্বাগতম',
    cancel: 'বাতিল',
    confirm: 'নিশ্চিত',
    error: 'ত্রুটি',
    success: 'সফল',
    fillRequiredFields: 'সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন',
    customerAdded: 'গ্রাহক সফলভাবে যোগ করা হয়েছে',
    fabricAdded: 'কাপড় সফলভাবে যোগ করা হয়েছে',
    transactionAdded: 'লেনদেন সফলভাবে যোগ করা হয়েছে',
    invalidAmount: 'একটি বৈধ পরিমাণ লিখুন',
    namePhoneRequired: 'নাম এবং ফোন নম্বর প্রয়োজন',
    addNewCustomer: 'নতুন গ্রাহক যোগ করুন',
    addNewCustomerDesc: 'আপনার গ্রাহকদের ট্র্যাক রাখতে বিবরণ যোগ করুন',
    customerName: 'গ্রাহকের নাম',
    enterCustomerName: 'গ্রাহকের নাম লিখুন',
    phoneNumber: 'ফোন নম্বর',
    enterPhoneNumber: 'ফোন নম্বর লিখুন',
    email: 'ইমেইল',
    enterEmail: 'ইমেইল ঠিকানা লিখুন',
    address: 'ঠিকানা',
    enterAddress: 'ঠিকানা লিখুন',
    favoriteProducts: 'প্রিয় পণ্য',
    enterFavoriteProducts: 'প্রিয় পণ্য বা পছন্দ লিখুন',
    addFabric: 'কাপড় যোগ করুন',
    addNewFabric: 'নতুন কাপড় যোগ করুন',
    addNewFabricDesc: 'আপনার ইনভেন্টরিতে নতুন কাপড় যোগ করুন',
    fabricName: 'কাপড়ের নাম',
    enterFabricName: 'কাপড়ের নাম লিখুন',
    fabricType: 'কাপড়ের ধরন',
    selectFabricType: 'কাপড়ের ধরন নির্বাচন করুন',
    shirting: 'শার্টিং',
    suiting: 'সুটিং',
    panjabi: 'পাঞ্জাবি',
    sherwani: 'শেরওয়ানি',
    color: 'রঙ',
    enterColor: 'রঙ লিখুন',
    pattern: 'প্যাটার্ন',
    enterPattern: 'প্যাটার্ন লিখুন',
    available: 'মজুদ',
    enterQuantity: 'পরিমাণ লিখুন',
    price: 'মূল্য',
    enterPrice: 'মূল্য লিখুন',
    quality: 'গুণমান',
    standard: 'স্ট্যান্ডার্ড',
    premium: 'প্রিমিয়াম',
    luxury: 'বিলাসী',
    supplier: 'সরবরাহকারী',
    enterSupplier: 'সরবরাহকারী লিখুন',
    addTransaction: 'লেনদেন যোগ করুন',
    addNewTransaction: 'নতুন লেনদেন যোগ করুন',
    addNewTransactionDesc: 'একটি নতুন আর্থিক লেনদেন যোগ করুন',
    transactionDate: 'লেনদেনের তারিখ',
    pickDate: 'তারিখ নির্বাচন করুন',
    description: 'বিবরণ',
    enterDescription: 'বিবরণ লিখুন',
    category: 'বিভাগ',
    selectCategory: 'বিভাগ নির্বাচন করুন',
    sales: 'বিক্রয়',
    salary: 'বেতন',
    rent: 'ভাড়া',
    utilities: 'উপযোগিতা',
    type: 'ধরন',
    income: 'আয়',
    expense: 'ব্যয়',
    amount: 'পরিমাণ',
    enterAmount: 'পরিমাণ লিখুন',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    cash: 'নগদ',
    card: 'কার্ড',
    bankTransfer: 'ব্যাংক হস্তান্তর',
    orderHistory: 'অর্ডার ইতিহাস',
    preferences: 'পছন্দ',
    customerPreferences: 'গ্রাহকের পছন্দ',
    lastPurchase: 'শেষ ক্রয়',
    noPreferencesYet: 'এখনও কোন পছন্দ রেকর্ড করা হয়নি',
    noPurchaseYet: 'এখনও কোন ক্রয় রেকর্ড করা হয়নি',
    notes: 'নোট',
    noNotesYet: 'এখনও কোন নোট যোগ করা হয়নি',
    totalSpent: 'মোট ব্যয়',
    orderTaken: 'অর্ডার নেওয়া হয়েছে',
    sentToFactory: 'ফ্যাক্টরিতে পাঠানো হয়েছে',
    readyForPickup: 'সংগ্রহের জন্য প্রস্তুত',
    delivered: 'সরবরাহ করা হয়েছে',
    sendWishes: 'শুভেচ্ছা পাঠান',
    sendOffer: 'অফার পাঠান',
    whatsappMessage: 'হোয়াটসঅ্যাপ বার্তা পাঠান',
    birthdayMessage: 'শুভ জন্মদিন! একটি নতুন পোশাকের সাথে উদযাপন করুন - পরবর্তী ক্রয়ে ১০% ছাড়!',
    specialOfferMessage: 'আমরা আপনাকে মিস করি! পরবর্তী ক্রয়ে ১৫% ছাড় উপভোগ করুন। শীঘ্রই আমাদের সাথে দেখা করুন!',
    restock: 'পুনরায় স্টক করুন',
    addNewItem: 'নতুন আইটেম যোগ করুন',
    viewProfile: 'প্রোফাইল দেখুন',
    orderManagement: 'অর্ডার ব্যবস্থাপনা',
    customerManagement: 'গ্রাহক ব্যবস্থাপনা',
    inventoryManagement: 'ইনভেন্টরি ব্যবস্থাপনা',
    financialManagement: 'আর্থিক ব্যবস্থাপনা',
    trackInventory: 'আপনার কাপড়ের ইনভেন্টরি ট্র্যাক এবং পরিচালনা করুন',
    trackOrders: 'টেইলারিং অর্ডার পরিচালনা এবং তাদের অগ্রগতি ট্র্যাক করুন',
    trackCustomers: 'আপনার গ্রাহক সম্পর্ক এবং ইতিহাস পরিচালনা করুন',
    createOrder: 'অর্ডার তৈরি করুন',
    financialDashboard: 'আর্থিক ড্যাশবোর্ড',
    totalOrders: 'মোট অর্ডার',
    totalPayments: 'মোট পেমেন্ট',
    pendingAmounts: 'বকেয়া পরিমাণ',
    orderValue: 'অর্ডার মূল্য',
    ordersByStatus: 'স্ট্যাটাস অনুযায়ী অর্ডার',
    orderValueByStatus: 'স্ট্যাটাস অনুযায়ী অর্ডার মূল্য',
    searchOrders: 'অর্ডার অনুসন্ধান করুন...',
    searchCustomers: 'গ্রাহক অনুসন্ধান করুন...',
    searchFabrics: 'কাপড় অনুসন্ধান করুন...',
    searchTransactions: 'লেনদেন অনুসন্ধান করুন...',
    gridView: 'গ্রিড ভিউ',
    listView: 'লিস্ট ভিউ',
    addNewProductType: 'নতুন পণ্যের ধরন যোগ করুন',
    addNewProductTypeDesc: 'টেইলরিং অর্ডারের জন্য একটি নতুন পণ্যের ধরন তৈরি করুন',
    productId: 'পণ্য আইডি',
    productName: 'পণ্যের নাম',
    internalIdentifier: 'এটি অভ্যন্তরীণ শনাক্তকারী হিসাবে ব্যবহৃত হবে',
    displayName: 'এটি গ্রাহকরা দেখবেন এমন ডিসপ্লে নাম',
    createNewProductType: 'নতুন পণ্যের ধরন তৈরি করুন',
    productAdded: 'পণ্যের ধরন সফলভাবে যোগ করা হয়েছে',
    date: 'তারিখ',
    product: 'পণ্য',
    status: 'অবস্থা',
    additionalPreferences: 'অতিরিক্ত পছন্দসমূহ',
    addNote: 'নোট যোগ করুন',
    reports: 'প্রতিবেদন',
    accounts: 'অ্যাকাউন্টস',
    dateRange: 'তারিখের পরিসীমা',
    breakdown: 'বিশ্লেষণ',
    weekly: 'সাপ্তাহিক',
    financialPerformance: 'আর্থিক কর্মক্ষমতা',
    accountsManagement: 'অ্যাকাউন্ট ব্যবস্থাপনা',
    comingSoon: 'শীঘ্রই আসছে',
    trackAccounts: 'আপনার ব্যাংক অ্যাকাউন্ট, নগদ ব্যালেন্স এবং পেমেন্ট পদ্ধতি ট্র্যাক করুন',
    exploreTransactions: 'লেনদেন অন্বেষণ করুন',
    other: 'অন্যান্য',
    pending: 'বিচারাধীন',
    fabric: 'কাপড়',
    addedSuccessfully: 'সফলভাবে যোগ করা হয়েছে',
    editing: 'সম্পাদনা করা হচ্ছে',
    confirmDelete: 'আপনি কি নিশ্চিত যে আপনি এটি মুছতে চান?',
    deleted: 'মুছে ফেলা হয়েছে',
    hasBeenDeleted: 'মুছে ফেলা হয়েছে',
    stockUpdated: 'স্টক আপডেট হয়েছে',
    stockUpdatedTo: 'স্টক আপডেট হয়েছে',
    searchByFabricCode: 'কাপড় কোড বা নাম দিয়ে অনুসন্ধান করুন',
    buyingPrice: 'ক্রয় মূল্য',
    sellingPrice: 'বিক্রয় মূল্য',
    actions: 'কার্যক্রম',
    pieces: 'টুকরা',
    addStock: 'স্টক যোগ করুন',
    edit: 'সম্পাদনা করুন',
    delete: 'মুছুন'
  }
};

type LanguageContextType = {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'bn'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'en' | 'bn') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
