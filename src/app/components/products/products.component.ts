import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TrimTextPipe, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  private readonly _ProductsService = inject(ProductsService);

  productList : Signal<IProduct[]> = computed(() => this._ProductsService.productList())
  
  searchInput : WritableSignal<string> = signal("");

  ngOnInit(): void {
      this._ProductsService.getAllProducts().subscribe({
        next : (res : IProduct[]) => {
          this._ProductsService.productList.set(res);
        }
      })
  }

}
