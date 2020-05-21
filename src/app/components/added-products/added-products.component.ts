import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Chip } from 'src/app/interfaces/Chip.interface';
import { Product } from 'src/app/interfaces/Product.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.css']
})
export class AddedProductsComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output()
  remove = new EventEmitter<string>();

  public pageProducts: Product[];
  public length: number;
  public pageSize: number;
  public pageSizeOptions: number[];
  public chips: Chip[];

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
    this.pageSize = 10;
    this.pageSizeOptions = [5, 10, 20, 100];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.length = changes.products.currentValue.length;
    this.pageProducts = changes.products.currentValue.slice(0, this.pageSize);
  }

  public paginate(event: PageEvent): void {
    const pageStart = event.pageIndex * event.pageSize;
    const pageEnd = pageStart + event.pageSize;
    this.pageProducts = this.products.slice(pageStart, pageEnd);
  }

  public removeProduct(guid: string) {
    this.remove.emit(guid)
  }
}
