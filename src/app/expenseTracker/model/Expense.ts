import { Money } from './Money';

export class Expense {
    id: number;
    amount: Money;
    reason: string;
    date: string;
    originalAmount: Money;
    exchangeRate: number;
    tags: string[];
}