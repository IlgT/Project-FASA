import { Expense } from '../expense';

export const defaultExpense: Expense = {
    id: null,
    reason: "",
    amount: {
      value: null,
      currency: "€"
    },
    date: null,
    exchangeValue: {
      value: null,
      currency: "€"
    },
    exchangeRate: 1,
    tags: [null]
  }