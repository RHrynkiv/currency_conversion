import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICurrency} from "../models/ICurrency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private url:string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

  constructor(private httpClient: HttpClient) { }

  public getCurrency() : Observable<ICurrency[]> {
    return this.httpClient.get<ICurrency[]>(this.url);
}

}
