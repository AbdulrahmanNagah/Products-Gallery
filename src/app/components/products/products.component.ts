import { Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TrimTextPipe, SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {


  private readonly _ProductsService = inject(ProductsService);
   readonly _CartService = inject(CartService);

  productList : Signal<IProduct[]> = computed(() => this._ProductsService.productList())
  
  searchInput : WritableSignal<string> = signal("");

  productsSub !: Subscription;
  

  ngOnInit(): void {
      this.productsSub =  this._ProductsService.getAllProducts().subscribe({
        next : (res : IProduct[]) => {
          this._ProductsService.productList.set(res);
        }
      })
  }




  ngOnDestroy(): void {
      this.productsSub.unsubscribe();
  }
  

}
