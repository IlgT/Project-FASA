import { Money } from './Money';

export class Expense {
    id: number;
    version: number;
    amount: Money;
    reason: string;
    date: string;
    originalAmount: Money;
    exchangeRate: number;
    tags: string[];
}

export function compareExpensesDate(e1:Expense, e2: Expense) {
    if (e1.date > e2.date) {
      return 1;
    }
    else if (e1.date < e2.date) {
      return -1;
    }
    else return 0;
  
  }