import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const { user, getVendorCategory } = useAuth();
  const [loading, setLoading] = useState(false);

  // Financial accounts state
  const [accounts, setAccounts] = useState([]);
  const [debitCards, setDebitCards] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [cashBalance, setCashBalance] = useState(0);
  const [digitalWallets, setDigitalWallets] = useState([]);

  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [revenue, setRevenue] = useState([]);

  // Budget & Goals
  const [budgets, setBudgets] = useState([]);
  const [financialGoals, setFinancialGoals] = useState([]);

  // Mock data initialization
  useEffect(() => {
    if (user) {
      initializeMockData();
    }
  }, [user]);

  const initializeMockData = () => {
    // Mock bank accounts
    setAccounts([
      { id: 1, name: 'Business Checking', bank: 'Bank ABC', balance: 45000, type: 'checking' },
      { id: 2, name: 'Savings Account', bank: 'Bank ABC', balance: 25000, type: 'savings' }
    ]);

    // Mock debit cards
    setDebitCards([
      { id: 1, name: 'Business Debit', last4: '4532', balance: 45000, limit: 50000, bank: 'Bank ABC' }
    ]);

    // Mock credit cards
    setCreditCards([
      { id: 1, name: 'Business Credit', last4: '8765', balance: 8500, limit: 25000, dueDate: '2024-02-15', bank: 'Bank XYZ' }
    ]);

    // Mock cash balance
    setCashBalance(5000);

    // Mock digital wallets
    setDigitalWallets([
      { id: 1, name: 'PayPal Business', balance: 12000, type: 'paypal' },
      { id: 2, name: 'Stripe Account', balance: 8500, type: 'stripe' }
    ]);

    // Mock budgets
    setBudgets([
      { id: 1, category: 'Equipment', allocated: 10000, spent: 6500, period: 'monthly' },
      { id: 2, category: 'Marketing', allocated: 5000, spent: 3200, period: 'monthly' },
      { id: 3, category: 'Operations', allocated: 8000, spent: 5800, period: 'monthly' }
    ]);

    // Mock financial goals
    setFinancialGoals([
      { id: 1, name: 'New Camera Equipment', target: 15000, current: 8500, deadline: '2024-06-30' },
      { id: 2, name: 'Emergency Fund', target: 50000, current: 25000, deadline: '2024-12-31' }
    ]);
  };

  // Account management functions
  const addAccount = (accountData) => {
    const newAccount = { id: Date.now(), ...accountData };
    setAccounts(prev => [...prev, newAccount]);
    return newAccount;
  };

  const updateAccount = (id, updates) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...updates } : acc));
  };

  const deleteAccount = (id) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  // Debit card functions
  const addDebitCard = (cardData) => {
    const newCard = { id: Date.now(), ...cardData };
    setDebitCards(prev => [...prev, newCard]);
    return newCard;
  };

  const updateDebitCard = (id, updates) => {
    setDebitCards(prev => prev.map(card => card.id === id ? { ...card, ...updates } : card));
  };

  // Credit card functions
  const addCreditCard = (cardData) => {
    const newCard = { id: Date.now(), ...cardData };
    setCreditCards(prev => [...prev, newCard]);
    return newCard;
  };

  const updateCreditCard = (id, updates) => {
    setCreditCards(prev => prev.map(card => card.id === id ? { ...card, ...updates } : card));
  };

  const makeCreditCardPayment = (id, amount) => {
    setCreditCards(prev => prev.map(card => 
      card.id === id ? { ...card, balance: card.balance - amount } : card
    ));
  };

  // Cash management
  const updateCashBalance = (amount) => {
    setCashBalance(prev => prev + amount);
  };

  const recordCashTransaction = (transactionData) => {
    const newTransaction = {
      id: Date.now(),
      type: 'cash',
      ...transactionData,
      date: new Date().toISOString()
    };
    setTransactions(prev => [...prev, newTransaction]);
    updateCashBalance(transactionData.amount);
  };

  // Digital wallet functions
  const addDigitalWallet = (walletData) => {
    const newWallet = { id: Date.now(), ...walletData };
    setDigitalWallets(prev => [...prev, newWallet]);
    return newWallet;
  };

  const updateDigitalWallet = (id, updates) => {
    setDigitalWallets(prev => prev.map(wallet => 
      wallet.id === id ? { ...wallet, ...updates } : wallet
    ));
  };

  // Expense management
  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      date: new Date().toISOString()
    };
    setExpenses(prev => [...prev, newExpense]);
    return newExpense;
  };

  const updateExpense = (id, updates) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  // Revenue management
  const addRevenue = (revenueData) => {
    const newRevenue = {
      id: Date.now(),
      ...revenueData,
      date: new Date().toISOString()
    };
    setRevenue(prev => [...prev, newRevenue]);
    return newRevenue;
  };

  // Budget management
  const addBudget = (budgetData) => {
    const newBudget = { id: Date.now(), ...budgetData, spent: 0 };
    setBudgets(prev => [...prev, newBudget]);
    return newBudget;
  };

  const updateBudget = (id, updates) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id ? { ...budget, ...updates } : budget
    ));
  };

  // Financial goals
  const addFinancialGoal = (goalData) => {
    const newGoal = { id: Date.now(), ...goalData, current: 0 };
    setFinancialGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  const updateFinancialGoal = (id, updates) => {
    setFinancialGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  // Calculate total balance
  const getTotalBalance = () => {
    const accountsTotal = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const walletsTotal = digitalWallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    return accountsTotal + cashBalance + walletsTotal;
  };

  // Calculate total debt
  const getTotalDebt = () => {
    return creditCards.reduce((sum, card) => sum + card.balance, 0);
  };

  // Get financial summary
  const getFinancialSummary = () => {
    const totalBalance = getTotalBalance();
    const totalDebt = getTotalDebt();
    const netWorth = totalBalance - totalDebt;
    
    const monthlyRevenue = revenue
      .filter(r => new Date(r.date).getMonth() === new Date().getMonth())
      .reduce((sum, r) => sum + r.amount, 0);
    
    const monthlyExpenses = expenses
      .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      totalBalance,
      totalDebt,
      netWorth,
      monthlyRevenue,
      monthlyExpenses,
      monthlyProfit: monthlyRevenue - monthlyExpenses
    };
  };

  const value = {
    // State
    accounts,
    debitCards,
    creditCards,
    cashBalance,
    digitalWallets,
    transactions,
    expenses,
    revenue,
    budgets,
    financialGoals,
    loading,

    // Account functions
    addAccount,
    updateAccount,
    deleteAccount,

    // Card functions
    addDebitCard,
    updateDebitCard,
    addCreditCard,
    updateCreditCard,
    makeCreditCardPayment,

    // Cash functions
    updateCashBalance,
    recordCashTransaction,

    // Wallet functions
    addDigitalWallet,
    updateDigitalWallet,

    // Expense functions
    addExpense,
    updateExpense,
    deleteExpense,

    // Revenue functions
    addRevenue,

    // Budget functions
    addBudget,
    updateBudget,

    // Goal functions
    addFinancialGoal,
    updateFinancialGoal,

    // Summary functions
    getTotalBalance,
    getTotalDebt,
    getFinancialSummary
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

export default FinancialContext;
