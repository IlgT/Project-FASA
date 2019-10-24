import {Money} from './Money'
import {Tag} from './Tag'

export class Expense {
    id: number;
    amount: Money;
    reason: string;
    date: Date;
    exchangeValue: Money;
    exchangeRate: number;
    tag: Tag;
}