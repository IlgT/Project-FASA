import { Expense } from '../expense';

export const defaultExpense: Expense = {
    id: 1,
    amount: {
      value: 85.86,
      currency: "EUR"
    },
    reason: "Kaufland",
    date: new Date(),
    exchangeValue: {
      value: 85.86,
      currency: "€"
    },
    exchangeRate: 1,
    tag: {
      id: 1,
      name: "Lebensmittel"
    }
  }