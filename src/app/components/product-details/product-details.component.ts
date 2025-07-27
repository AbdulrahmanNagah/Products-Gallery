import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  readonly _CartService = inject(CartService);

  private readonly _ActivatedRoute = inject(ActivatedRoute);

  productId ! : string | null;

  productDetails : IProduct = {} as IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.productId = p.get("id");
      }
    })
    if(this.productId !== null)
    {
      this._ProductsService.getProductDetails(this.productId).subscribe({
        next: (res) => {
          this.productDetails = res;
        }
      })
    }
  }
  

}
