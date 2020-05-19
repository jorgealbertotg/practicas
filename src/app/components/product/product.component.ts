import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() name: string;
  @Input() category: string;
  @Input() currentPrice: string;
  @Input() lastPrice: string;
  @Input() isOffer: boolean;
  @Input() isActive: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
