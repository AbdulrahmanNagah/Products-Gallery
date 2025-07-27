import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { IProduct } from '../../core/interfaces/iproduct';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly _FlowbiteService = inject(FlowbiteService)
  private readonly _ProductsService = inject(ProductsService)

  private readonly PLATFORM_ID = inject(PLATFORM_ID);
  
  darkTheme : boolean = false;
  sortBg : number = 0;

   ngOnInit(): void {
     this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if(isPlatformBrowser(this.PLATFORM_ID)){

      if(localStorage.getItem("theme")){
          this.darkTheme = true;
          document.documentElement.classList.add("dark");
        }else{
          this.darkTheme = false;
          document.documentElement.classList.remove("dark");
        }
    }

    
  }
  

  changeTheme() : void{
    if(isPlatformBrowser(this.PLATFORM_ID))
    {
      if(localStorage.getItem("theme")){
        localStorage.removeItem("theme");
      }else{
        localStorage.setItem("theme", "dark");
      }

      if(localStorage.getItem("theme")){
        this.darkTheme = true;
        document.documentElement.classList.add("dark");
      }else{
        this.darkTheme = false;
        document.documentElement.classList.remove("dark");
      }
    }
    
  }

  sortByName() : void{
    this._ProductsService.getAllProducts().subscribe({
      next: (res : IProduct[]) => {
        this._ProductsService.productList.set(res.sort((a,b) => a.title.localeCompare(b.title)));
        this.sortBg = 1;
      }
    })
  }
  sortByPrice(htl : boolean) : void{
   if(htl) {
     this._ProductsService.getAllProducts().subscribe({
      next: (res : IProduct[]) => {
        this._ProductsService.productList.set(res.sort((a,b) => b.price - a.price));
        this.sortBg = 2;
      }
    })
   }
   else{
     this._ProductsService.getAllProducts().subscribe({
      next: (res : IProduct[]) => {
        this._ProductsService.productList.set(res.sort((a,b) => a.price - b.price));
        this.sortBg = 3;
      }
    })
   }
  }



  

}
