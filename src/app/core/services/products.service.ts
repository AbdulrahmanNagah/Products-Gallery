import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productList : WritableSignal<IProduct[]> = signal([]);
  
  constructor(private _HttpClient : HttpClient) { }

  getAllProducts() : Observable<any>
  {
    return this._HttpClient.get(`https://fakestoreapi.com/products`);
  }
  
}
