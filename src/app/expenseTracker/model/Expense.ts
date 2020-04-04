import {Tag} from './Tag'
import { Money } from './Money';

export class Expense {
    id: number;
    amount: Money;
    reason: string;
    date: string;
    originalValue?: Money;
    exchangeRate?: number;
    tags: string[];
}