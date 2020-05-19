import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://demo6292426.mockable.io/products';
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
