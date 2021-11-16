import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: MenuItem[] = [];
  activeRoute = -1;

  constructor(
    private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.indexOf('user') !== -1) {
          this.activeRoute = 0;
        } else if (event.url.indexOf('distributor-inventory') !== -1) {
          this.activeRoute = 1;
        } else if (event.url.indexOf('distributor-orders') !== -1) {
          this.activeRoute = 2;
        } else if (event.url.indexOf('retailer-placed-orders') !== -1) {
          this.activeRoute = 3;
        } else if (event.url.indexOf('retailers-orders') !== -1) {
          this.activeRoute = 4;
        } else if (event.url.indexOf('retailers-inventory') !== -1) {
          this.activeRoute = 5;
        } else if (event.url.indexOf('customer-orders') !== -1) {
          this.activeRoute = 6;
        }
        this.setUpMenu();
      });
  }

  ngOnInit(): void {
    this.setUpMenu();
  }

  setUpMenu() {
    this.navItems = [
      {
        label: 'Registered users',
        icon: 'ei ei-bus',
        routerLink: './users',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 0) ? 'ui-state-active' : ''
      },
      {
        label: 'Distributor Inventory',
        icon: 'ei ei-bus',
        routerLink: './distributor-inventory',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 1) ? 'ui-state-active' : ''
      },
      {
        label: 'Distributor Orders',
        icon: 'ei ei-bus',
        routerLink: './distributor-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 2) ? 'ui-state-active' : ''
      },
      {
        label: 'Retailer placed orders',
        icon: 'ei ei-bus',
        routerLink: './retailer-placed-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 3) ? 'ui-state-active' : ''
      },
      {
        label: 'Retailers orders',
        icon: 'ei ei-bus',
        routerLink: './retailers-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 4) ? 'ui-state-active' : ''
      },
      {
        label: 'Retailers Inventory',
        icon: 'ei ei-bus',
        routerLink: './retailers-inventory',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 5) ? 'ui-state-active' : ''
      },
      {
        label: 'Customer orders',
        icon: 'ei ei-bus',
        routerLink: './customer-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 6) ? 'ui-state-active' : ''
      }
    ];
  }

}
