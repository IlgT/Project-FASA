import { Expense } from './Expense';

export const defaultExpense: Expense = {
    id: null,
    version: null,
    reason: "",
    amount: {
      value: null,
      currency: "EUR"
    },
    date: null,
    originalAmount: {
      value: 0,
      currency: "EUR"
    },
    exchangeRate: 1,
    tags: []
  }