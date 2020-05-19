import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Product } from 'src/app/interfaces/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public matDialogRef;

  constructor(public matDialog: MatDialog) { }

  openDialog(): void {
    this.matDialogRef = this.matDialog.open(DialogComponent);
  }

  public setDialogData(data: any): void {
    const dialogComponent: DialogComponent = this.matDialogRef.componentInstance;
    dialogComponent.product = data.product;
    dialogComponent.title = data.title;
    dialogComponent.about = data.about;
    dialogComponent.currentPrice = data.currentPrice;
    dialogComponent.lastPrice = data.lastPrice;
  }
}
