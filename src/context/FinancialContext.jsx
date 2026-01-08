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
    const now = new Date();
    const isoNow = now.toISOString();

    // Mock bank accounts
    setAccounts([
      { id: 1, name: 'Business Checking', bank: 'Bank ABC', balance: 45000000, type: 'checking' },
      { id: 2, name: 'Savings Account', bank: 'Bank ABC', balance: 25000000, type: 'savings' }
    ]);

    // Mock debit cards
    setDebitCards([
      { id: 1, name: 'Business Debit', last4: '4532', balance: 45000000, limit: 50000000, bank: 'Bank ABC' }
    ]);

    // Mock credit cards
    setCreditCards([
      { id: 1, name: 'Business Credit', last4: '8765', balance: 8500000, limit: 25000000, dueDate: isoNow, bank: 'Bank XYZ' }
    ]);

    // Mock cash balance
    setCashBalance(5000000);

    // Mock digital wallets
    setDigitalWallets([
      { id: 1, name: 'PayPal Business', balance: 12000000, type: 'paypal' },
      { id: 2, name: 'Stripe Account', balance: 8500000, type: 'stripe' }
    ]);

    // Mock budgets
    setBudgets([
      { id: 1, category: 'Equipment', allocated: 10000000, spent: 6500000, period: 'monthly' },
      { id: 2, category: 'Marketing', allocated: 5000000, spent: 3200000, period: 'monthly' },
      { id: 3, category: 'Operations', allocated: 8000000, spent: 5800000, period: 'monthly' }
    ]);

    // Mock financial goals
    setFinancialGoals([
      { id: 1, name: 'New Camera Equipment', target: 15000000, current: 8500000, deadline: isoNow },
      { id: 2, name: 'Emergency Fund', target: 50000000, current: 25000000, deadline: isoNow }
    ]);

    // Mock revenue (used for summaries)
    setRevenue([
      { id: 1, source: 'Sarah & John Wedding - Final Payment', amount: 7500000, date: isoNow },
      { id: 2, source: 'Emma & Michael Engagement - Deposit', amount: 2000000, date: isoNow }
    ]);

    // Mock expenses (used for summaries)
    setExpenses([
      { id: 1, category: 'Equipment', description: 'Camera maintenance', amount: 3500000, date: isoNow },
      { id: 2, category: 'Marketing', description: 'Social media ads', amount: 1800000, date: isoNow },
      { id: 3, category: 'Operations', description: 'Studio rent', amount: 3200000, date: isoNow }
    ]);

    // Mock transactions (used in dashboards & detail views)
    setTransactions([
      {
        id: 1,
        type: 'income',
        description: 'Sarah & John Wedding - Final Payment',
        amount: 7500000,
        date: isoNow,
        status: 'completed',
        clientId: 1,
        clientName: 'Sarah Johnson',
        projectId: 1,
      },
      {
        id: 2,
        type: 'expense',
        description: 'Camera maintenance',
        amount: -500000,
        date: isoNow,
        status: 'completed',
        category: 'Equipment',
        clientId: 1,
        projectId: 1,
      },
      {
        id: 3,
        type: 'income',
        description: 'Emma & Michael Engagement - Deposit',
        amount: 2000000,
        date: isoNow,
        status: 'pending',
        clientId: 2,
        clientName: 'Emma Wilson',
        projectId: 2,
      },
      {
        id: 4,
        type: 'expense',
        description: 'Studio rent',
        amount: -1200000,
        date: isoNow,
        status: 'completed',
        category: 'Operations',
        clientId: 3,
        projectId: 3,
      }
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

  // Generic helper to add transaction tied to client/project
  const addClientTransaction = ({
    clientId,
    projectId,
    type, // 'income' | 'expense'
    amount,
    description,
    status = 'completed',
  }) => {
    const numericAmount = Number(amount) || 0;
    const now = new Date().toISOString();

    if (!clientId || !numericAmount || !type) {
      return null;
    }

    // Update revenue/expenses collections for summaries
    if (type === 'income') {
      addRevenue({ clientId, projectId, amount: numericAmount, description });
    } else if (type === 'expense') {
      addExpense({ clientId, projectId, amount: numericAmount, description });
    }

    // Push to main transactions list (positive for income, negative for expense)
    const tx = {
      id: Date.now(),
      clientId,
      projectId,
      type,
      description,
      amount: type === 'income' ? numericAmount : -numericAmount,
      date: now,
      status,
    };

    setTransactions((prev) => [...prev, tx]);
    return tx;
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

  // Helper: filter transactions by project or client (dipakai di financial views & project detail)
  const getTransactionsByProject = (projectId) => {
    return transactions.filter((tx) => tx.projectId === projectId);
  };

  const getTransactionsByClient = (clientId) => {
    return transactions.filter((tx) => tx.clientId === clientId);
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
    addClientTransaction,

    // Budget functions
    addBudget,
    updateBudget,

    // Goal functions
    addFinancialGoal,
    updateFinancialGoal,

    // Summary functions
    getTotalBalance,
    getTotalDebt,
    getFinancialSummary,
    getTransactionsByProject,
    getTransactionsByClient
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
