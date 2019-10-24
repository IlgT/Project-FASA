import { Expense } from './expense';

export const EXPENSES: Expense[] = [
  {
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
  },
  {
    id: 2,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Kaufland",
    date: new Date(),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tag: {
      id: 1,
      name: "Lebensmittel"
    }
  }
  ];