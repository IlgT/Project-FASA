import { Expense } from '../expense';

export const defaultExpense: Expense = {
    id: null,
    reason: "",
    amount: {
      value: null,
      currency: "EUR"
    },
    date: null,
    exchangeValue: {
      value: 0,
      currency: "EUR"
    },
    exchangeRate: 1,
    tags: []
  }