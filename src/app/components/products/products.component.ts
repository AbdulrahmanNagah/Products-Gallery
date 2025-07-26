import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TrimTextPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  private readonly _ProductsService = inject(ProductsService);

  productList : WritableSignal<IProduct[]> = signal([]);
  

  ngOnInit(): void {
      this._ProductsService.getAllProducts().subscribe({
        next : (res) => {
          this.productList.set(res);
        }
      })
  }

}
