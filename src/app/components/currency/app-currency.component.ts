import {Component, OnInit} from "@angular/core";
import {CurrencyService} from "../../services/currency.service";
import {ICurrency} from "../../models/ICurrency";

@Component({
  selector: 'app-currency',
  templateUrl: "./app-currency.component.html",
  styleUrls: ["./app-currency.component.css"]
})
export class CurrencyComponent implements OnInit {
  currencyData!: ICurrency[];
  dataToConvert!: number;
  convertedData!: number;
  OptionType: any
  currencies!: Array<string>
  selectedCurrencyFirst: any
  selectedCurrencySecond: any

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencies = ['UAH', 'USD', 'EUR']
    this.selectedCurrencyFirst = this.currencies[0]
    this.selectedCurrencySecond = this.currencies[1]
    this.currencyService.getCurrency().subscribe(value => {
      this.filterData(value)
    })

  }

  private filterData(data: ICurrency[]) {
    this.currencyData = [{  cc: "UAH",
      exchangedate: 'string',
      r030: 1,
      rate: 0.3,
      txt: 1},...data.filter((val) => {
      if (val.cc === 'USD' || val.cc === 'EUR' || val.cc === "UAH") {
        return val;

      } else {
        return;
      }
    })]
  }


  convertDataFirst() {
    if (this.selectedCurrencyFirst === this.selectedCurrencySecond) {
      this.convertedData = this.dataToConvert
    } else {
      if (this.selectedCurrencyFirst === 'UAH' ) {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencySecond) || 1
        this.convertedData = Number((this.dataToConvert / currentCurrency[0].rate).toFixed(3).slice(0, -1))
      } else {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencySecond)
        let anotherCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencyFirst)
        this.convertedData = Number((this.dataToConvert * (((this.dataToConvert * anotherCurrency[0].rate)/(this.dataToConvert * currentCurrency[0].rate)))).toFixed(3).slice(0, -1))
      }
    }
  }
  convertDataSecond() {
    if (this.selectedCurrencyFirst === this.selectedCurrencySecond) {
      this.dataToConvert = this.convertedData
    } else {
      if (this.selectedCurrencySecond === 'UAH' ) {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencyFirst)
        this.dataToConvert = Number((this.convertedData /currentCurrency[0].rate).toFixed(3).slice(0, -1))
      } else {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencyFirst)
        let anotherCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencySecond)
        this.dataToConvert = Number((this.convertedData * (((this.convertedData * anotherCurrency[0].rate)/(this.convertedData * currentCurrency[0].rate)))).toFixed(3).slice(0, -1))
      }
    }
  }
}

