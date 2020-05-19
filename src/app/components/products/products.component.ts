import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/Product.interface';
import { PageEvent } from '@angular/material/paginator';
import { Chip } from 'src/app/interfaces/Chip.interface';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output()
  buyProduct = new EventEmitter<Product>();

  public pageProducts: Product[];
  public length: number;
  public pageSize: number;
  public pageSizeOptions: number[];
  public chips: Chip[];

  constructor(public dialogService: DialogService) {
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

  public openDialog(product: Product): void {
    this.dialogService.openDialog();
    this.dialogService.setDialogData({
      product: product,
      title: product.name,
      about: product.about,
      currentPrice: product.price,
      lastPrice: product.comparativePrice
    });

    this.dialogService.matDialogRef.afterClosed().subscribe(product => {
      this.buyProduct.emit(product);
    });
  }

}
