import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './features/customer/my-orders/my-orders.component';
import { InventoryDistributorComponent } from './features/distributor/inventory-distributor/inventory-distributor.component';
import { OrderListComponent } from './features/distributor/order-list/order-list.component';
import { UserListComponent } from './features/owner/user-list/user-list.component';
import { AllInventoryComponent } from './features/retailer/all-inventory/all-inventory.component';
import { RetailerPlacedOrdersComponent } from './features/retailer/retailer-placed-orders/retailer-placed-orders.component';
import { RetailersOrderComponent } from './features/retailer/retailers-order/retailers-order.component';
import { AuthGuard } from './shared/services/auth-gaurd.service';


const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    data: {role: '10'},
    canActivate: [AuthGuard]
  },
  {
    path: 'distributor-inventory',
    component: InventoryDistributorComponent,
    data: {role: '0'},
    canActivate: [AuthGuard]
  },
  {
    path: 'distributor-orders',
    component: OrderListComponent,
    data: {role: '0'},
    canActivate: [AuthGuard]
  },
  {
    path: 'retailer-placed-orders',
    component: RetailerPlacedOrdersComponent,
    data: {role: '1'},
    canActivate: [AuthGuard]
  },
  {
    path: 'retailers-orders',
    component: RetailersOrderComponent,
    data: {role: '1'},
    canActivate: [AuthGuard]
  },
  {
    path: 'retailers-inventory',
    component: AllInventoryComponent,
    data: {role: '1'},
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-orders',
    component: MyOrdersComponent,
    data: {role: '2'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
