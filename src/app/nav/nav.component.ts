import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
  {
    label: 'MLC',
    icon: 'pi pi-briefcase',   // case-related / records
    routerLink: '/home'
  },
  {
    label: 'Consent',
    icon: 'pi pi-file',   // document editing / signing
    routerLink: '/about'
  },
  {
    label: 'Incident',
    icon: 'pi pi-exclamation-triangle',  // warning / incident
    routerLink: '/contact'
  },
  {
    label: 'Surgery',
    icon: 'pi pi-heart',   // medical/surgery related
    routerLink: '/profile'
  }
];

  }

}
