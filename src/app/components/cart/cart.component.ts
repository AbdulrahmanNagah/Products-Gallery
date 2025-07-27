import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TrimTextPipe , CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _ToastrService = inject(ToastrService);

  myCart : IProduct[] | null = null;
  totalPrice: number = 0;
  totalItems: number = 0;

  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.myCart = this._CartService.getCartItems();
      
      this.myCart.forEach((item) => this.totalPrice += item.price);
      this.totalItems = this.myCart.length;
    }
  }

  removeItem(productIndex: number) :void{
    this._CartService.deleteFromCart(productIndex);
    this.myCart = this._CartService.getCartItems();
    this.totalPrice = 0;
    this.myCart.forEach((item) => this.totalPrice += item.price);
    this._ToastrService.info("Item remove from your cart")
  }
  

  removeAllItems() : void{
    this._CartService.clearCart();
    this.myCart = this._CartService.cart;
  }
}
