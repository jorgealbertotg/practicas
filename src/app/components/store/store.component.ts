import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/interfaces/Product.interface';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ProductsComponent } from '../products/products.component';
import { Chip } from 'src/app/interfaces/Chip.interface';
import { AddedProductsComponent } from '../added-products/added-products.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  @ViewChild(ProductsComponent) productsComponent: ProductsComponent;
  @ViewChild(AddedProductsComponent) addedProductsComponent: AddedProductsComponent;

  public products: Product[];
  public storedProducts: Product[];
  public addedProducts: Product[];
  public addedFilteredProducts: Product[];

  public chips: Chip[];
  public filters: string[];

  constructor(public productsService: ProductsService) {
    this.products = [];
    this.storedProducts = [];
    this.addedProducts = [];
    this.addedFilteredProducts = [];
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.storedProducts = products;
      console.log(this.storedProducts)
    });
  }

  public tabChange(event: MatTabChangeEvent): void {
    this.setTabProducts(event.index);
  }

  public setTabConfiguration(component): void {
    this.chips = component.chips;
    this.filters = component.chips.map(chip => {
      if (chip.removable) {
        return chip.name;
      }
    }).filter(chip => chip);
  }

  public setTabProducts(index: number): void {
    switch (index) {
      case 0:
        this.setTabConfiguration(this.productsComponent);
        this.storedProducts = this.filterData(this.products, this.filters);
        break;
      case 1:
        this.setTabConfiguration(this.addedProductsComponent);
        this.addedFilteredProducts = this.filterData(this.addedProducts, this.filters);
        break;
    }
  }
  public selectChip(chip: Chip): void {
    this.setTabProducts(this.matTabGroup.selectedIndex);
  }

  public filterData(data, filters): Product[] {
    return data.filter(item => {
      if (filters.includes('hombre') ||
      filters.includes('mujer') ||
      filters.includes('joven')) {
        if (filters.includes(item.category)) {
          return true
        }
      } else {
        return true
      }
    }).filter(item => {
      if (filters.includes('oferta')) {
        if (item.isOffer) {
          return true
        }
      } else {
        return true
      }
    }).filter(item => {
      if (filters.includes('agotado') || filters.includes('disponible')) {
        if (filters.includes('agotado') && !item.isActive) {
          return true
        }
        if (filters.includes('disponible') && item.isActive) {
          return true
        }
      } else {
        return true
      }
    })
  }

  public buyProduct(product: Product): void {
    if (!this.productExist(this.addedProducts, product.guid)) {
      this.addedProducts.push(product);
      console.log(this.addedProducts)
    }
  }
  
  public productExist(products: Product[], productId: string): boolean {
    for (let i = 0; i < products.length; i++) {
      if (products[i].guid === productId) {
        return true;
      }
    }
    return false;
  }
}
