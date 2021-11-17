import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng';
import { filter } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: MenuItem[] = [];
  activeRoute = -1;

  constructor(
    private router: Router,
    private accountService: AccountService) {
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

        const role = this.accountService.userRole;
        if (role === 0) {
          this.setupDistributorMenu();
        } else if (role === 1) {
          this.setupRetailerMenu();
        } else if (role === 2) {
          this.setupCustomerMenu();
        } else {
          this.setupOwnerMenu();
        }

      });

  }

  ngOnInit(): void {
    const role = this.accountService.userRole;
    if (role === 0) {
      this.setupDistributorMenu();
    } else if (role === 1) {
      this.setupRetailerMenu();
    } else if (role === 2) {
      this.setupCustomerMenu();
    } else {
      this.setupOwnerMenu();
    }
  }

  setupOwnerMenu() {
    this.navItems = [
      {
        label: 'Registered users',
        icon: 'ei ei-users',
        routerLink: './users',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 0) ? 'ui-state-active' : ''
      }
    ];
  }

  setupDistributorMenu() {
    this.navItems = [
      {
        label: 'Inventory',
        icon: 'ei ei-barcode',
        routerLink: './distributor-inventory',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 1) ? 'ui-state-active' : ''
      },
      {
        label: 'Retailer orders',
        icon: 'ei ei-cart-express',
        routerLink: './distributor-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 2) ? 'ui-state-active' : ''
      }
    ];
  }

  setupRetailerMenu() {
    this.navItems = [
      {
        label: 'Inventory',
        icon: 'ei ei-barcode',
        routerLink: './retailers-inventory',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 5) ? 'ui-state-active' : ''
      },
      {
        label: 'My orders',
        icon: 'ei ei-cart-plus',
        routerLink: './retailer-placed-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 3) ? 'ui-state-active' : ''
      },
      {
        label: 'Customer orders',
        icon: 'ei ei-cart-express',
        routerLink: './retailers-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 4) ? 'ui-state-active' : ''
      }
    ];
  }

  setupCustomerMenu() {
    this.navItems = [
      {
        label: 'My orders',
        icon: 'ei ei-cart-plus',
        routerLink: './customer-orders',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 6) ? 'ui-state-active' : ''
      }
    ];
  }
}
