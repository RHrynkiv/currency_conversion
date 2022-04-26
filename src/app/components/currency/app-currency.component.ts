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
  currencies!: Array<string>
  selectedCurrencyFirst!: string
  selectedCurrencySecond!: string
  Identical!:boolean

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
    this.currencyData = data.filter((val) => {
      if (val.cc === 'USD' || val.cc === 'EUR' || val.cc === "UAH") {
        return val;
      } else {
        return;
      }
    })
  }



  convertDataFirst() {
    if (this.selectedCurrencyFirst === this.selectedCurrencySecond) {
      this.convertedData = this.dataToConvert
      this.Identical = true
    } else {
      this.Identical = false
      if (this.selectedCurrencyFirst === 'UAH' ) {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencySecond)
        this.convertedData = Number((this.dataToConvert / currentCurrency[0].rate).toFixed(3).slice(0, -1))
      } else {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencySecond)
        let anotherCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencyFirst)
        if (!currentCurrency.length){
          this.convertedData = Number((this.dataToConvert * anotherCurrency[0].rate).toFixed(3).slice(0, -1))
        }
        else{
          this.convertedData = Number((this.dataToConvert * (((this.dataToConvert * anotherCurrency[0].rate)/(this.dataToConvert * currentCurrency[0].rate)))).toFixed(3).slice(0, -1))
        }
      }
    }
  }
  convertDataSecond() {
    if (this.selectedCurrencyFirst === this.selectedCurrencySecond) {
      this.dataToConvert = this.convertedData
      this.Identical = true
    } else {
      this.Identical = false
      if (this.selectedCurrencySecond === 'UAH'  ) {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencyFirst)
        this.dataToConvert = Number((this.convertedData / currentCurrency[0].rate).toFixed(3).slice(0, -1))
      } else {
        let currentCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencyFirst)
        let anotherCurrency = this.currencyData.filter(e => e.cc == this.selectedCurrencySecond)
        if (!currentCurrency.length){
          this.dataToConvert = Number((this.convertedData * anotherCurrency[0].rate).toFixed(3).slice(0, -1))
        }
       else{
          this.dataToConvert = Number((this.convertedData * (((this.convertedData * anotherCurrency[0].rate)/(this.convertedData * currentCurrency[0].rate)))).toFixed(3).slice(0, -1))
        }

      }
    }
  }
}

