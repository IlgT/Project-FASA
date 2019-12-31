import { Expense } from './expense';

export const EXPENSES: Expense[] = [
  {
    id: 1,
    amount: {
      value: 85.86,
      currency: "EUR"
    },
    reason: "Kaufland",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "€"
    },
    exchangeRate: 1,
    tags: [{
      id: 1,
      name: "lebensmittel"
    }]
  },
  {
    id: 2,
    amount: {
      value: 132.90,
      currency: "EUR"
    },
    reason: "KFZ-Versicherung",
    date: new Date("2019-12-24").toJSON().substr(0, 10),
    exchangeValue: {
      value: 132.90,
      currency: "EUR"
    },
    exchangeRate: 1,
    tags: [{
      id: 1,
      name: "Versicherung"
    },
    {
      id: 2,
      name: "Jährlich"
    }]
  },
  {
    id: 3,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "SuperDry",
    date: new Date("2019-12-04").toJSON().substr(0, 10),
    exchangeValue: {
      value: 114.144,
      currency: "EUR"
    },
    exchangeRate: 1,
    tags: [{
      id: 1,
      name: "Shopping"
    }]
  },
  {
    id: 4,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("09 10 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Fun"
    }]
  },
  {
    id: 5,
    amount: {
      value: 120.00,
      currency: "EUR"
    },
    reason: "Kaufland",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 120,
      currency: "EUR"
    },
    exchangeRate: 1,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 6,
    amount: {
      value: 32.00,
      currency: "EUR"
    },
    reason: "Kino",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 32.00,
      currency: "EUR"
    },
    exchangeRate: 1,
    tags: [{
      id: 1,
      name: "Fun"
    }]
  },
  {
    id: 7,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 8,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 9,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 10,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 11,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 12,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  },
  {
    id: 13,
    amount: {
      value: 114.14,
      currency: "EUR"
    },
    reason: "Walt Disney World Resort",
    date: new Date("12 01 2019").toJSON().substr(0, 10),
    exchangeValue: {
      value: 85.86,
      currency: "USD"
    },
    exchangeRate: 1.329,
    tags: [{
      id: 1,
      name: "Lebensmittel"
    }]
  }
  ];