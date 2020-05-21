import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { Product } from 'src/app/interfaces/Product.interface';
import { Chip } from 'src/app/interfaces/Chip.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  displayedColumns: string[] = ['guid', 'name', 'price', 'comparativePrice'];
  dataSource = ELEMENT_DATA;

  public pageProducts: Product[];
  public chips: Chip[];
  public total: string;

  constructor() {
    this.chips = [
      {
        label: 'Mujer',
        name: 'mujer',
        removable: false
      },
      {
        label: 'Hombre',
        name: 'hombre',
        removable: false
      },
      {
        label: 'Joven',
        name: 'joven',
        removable: false
      },
      {
        label: 'Oferta',
        name: 'oferta',
        removable: false
      },
      {
        label: 'Disponible',
        name: 'disponible',
        removable: false
      },
      {
        label: 'Agotado',
        name: 'agotado',
        removable: false
      }
    ];
  }

  ngOnInit(): void {
    this.total = '$2,300';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageProducts = changes.products.currentValue;
    this.total = this.numberToCurrency(this.getDetailTotal(this.pageProducts));
  }

  public getDetailTotal(products: Product[]) {
    return products.reduce((total, product) => {
      const amount = this.getCurrentPrice(product);
      total += parseFloat(this.currencyToNumber(amount));
      return total;
    }, 0);
  }

  public getCurrentPrice(product: Product) {
    return this.numberToCurrency(this.getMin(product.price, product.comparativePrice))
  }

  public getLastPrice(product: Product) {
    return this.numberToCurrency(this.getMax(product.price, product.comparativePrice))
  }
  public getMin(v1: string, v2: string) {
    return Math.min(this.currencyToNumber(v1), this.currencyToNumber(v2))
  }

  public getMax(v1: string, v2: string) {
    return Math.max(this.currencyToNumber(v1), this.currencyToNumber(v2))
  }
  public currencyToNumber(stringCurrency: string): any {
    return Number.parseFloat(stringCurrency.slice(1).replace(',', '')).toFixed(2);
  }
  public numberToCurrency(numberCurrency: number): string {
    let num = Number.parseFloat(numberCurrency.toString()).toFixed(2).toString()
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1,')
    num = num.split('').reverse().join('').replace(/^[\.]/, '')
    return `$${num}`
  }
}
