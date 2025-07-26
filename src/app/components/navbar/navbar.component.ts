import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly _FlowbiteService = inject(FlowbiteService)

  private readonly PLATFORM_ID = inject(PLATFORM_ID);
  
  darkTheme : boolean = false;

   ngOnInit(): void {
     this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

  }
  

  

}
