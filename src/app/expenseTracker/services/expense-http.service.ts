import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../model/Expense';
import { FilterSearch } from '../model/FilterSearch';
import { UtilizedFilter } from '../model/UtilizedFilter';

@Injectable({
  providedIn: 'root'
})
export class ExpenseHttpService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "http://localhost:8080/FASA/api";

  private expenseResource: string = "/expenses";
  private filterResource: string = "/filter";
  private exchangeResource: string = "/exchange";

  loadExpenseListByFilter(searchCriteria: FilterSearch): Observable<Expense[]> {
    console.log("HTTP-CALL for loading all expense by filter");
    return this.http.post<Expense[]>(this.baseUrl+this.expenseResource+'/search', searchCriteria);
  }

  addExpense(expense: Expense): Observable<Expense> {
    console.log("HTTP-CALL for adding a expense");
    return this.http.post<Expense>(this.baseUrl+this.expenseResource, expense);
  }

  modifyExpense(expense: Expense): Observable<Expense> {
    console.log("HTTP-CALL for modifying a expense");
    return this.http.put<Expense>(this.baseUrl+this.expenseResource, expense);
  }

  deleteExpense(id: number): void {
    console.log("HTTP-CALL for deleting a expense");
    this.http.delete(this.baseUrl+this.expenseResource+'/'+id).subscribe();
  }

  loadUtilizedValuesForFilter(): Observable<UtilizedFilter> {
    console.log("HTTP-CALL for loading all utilized reasons, months and tags for filter dropdowns");
    return this.http.get<UtilizedFilter>(this.baseUrl+this.filterResource);
  }

  getDefaultCurrency(): Observable<string> {
    console.log("HTTP-CALL for loading default currency of the user");
    const options = {
      responseType: 'text' as 'json',
    };
    return this.http.get<string>(this.baseUrl+this.exchangeResource+'/default', options);
  }
}
