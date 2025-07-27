import { Injectable, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : IProduct[] = [];


  constructor(private _ToastrService : ToastrService) { }


  addToCart(product: IProduct) : void {
    this.cart.push(product);
    localStorage.setItem("userCart", JSON.stringify(this.cart));
    this._ToastrService.success("product added to cart successfully");
  }

  deleteFromCart(index: number) : void{
    this.cart.splice(index, 1);
    localStorage.setItem("userCart", JSON.stringify(this.cart));
  }

  getCartItems() : IProduct[]{
    if(localStorage.getItem("userCart") !== null)
    {
      this.cart = JSON.parse(localStorage.getItem("userCart")!);
    }
    return this.cart;
  }

  clearCart() :void{
    if(localStorage.getItem("userCart")){
      localStorage.removeItem("userCart");
      this.cart = [];
    }
  }
}
