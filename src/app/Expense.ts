import {Money} from './Money'
import {Tag} from './Tag'

export class Expense {
    id: number;
    amount: Money;
    reason: string;
    date: string;
    originalValue?: Money;
    exchangeRate?: number;
    tags: string[];
}