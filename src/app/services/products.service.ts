import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../store/products/models';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private base = '/api/products'; // TODO: replace with environment apiBaseUrl if available

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // If you have a real backend, uncomment the line below and remove the mock.
    // return this.http.get<Product[]>(`${this.base}`);

    // Mocked response for now to make the store usable without a backend.
    const mock: Product[] = [
      { id: 'p1', name: 'Demo Product 1', price: 9.99, description: 'Sample product' },
      { id: 'p2', name: 'Demo Product 2', price: 19.99, description: 'Another sample' },
    ];
    return of(mock).pipe(delay(400));
  }
}
