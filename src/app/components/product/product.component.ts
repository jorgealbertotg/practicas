import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() guid: string;
  @Input() name: string;
  @Input() category: string;
  @Input() currentPrice: string;
  @Input() lastPrice: string;
  @Input() isOffer: boolean;
  @Input() isActive: boolean;
  @Input() removable: boolean = false;
  @Output()
  remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public removeProduct(guid: string): void {
    this.remove.emit(guid);
  }
}
