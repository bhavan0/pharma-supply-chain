import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './features/customer/my-orders/my-orders.component';
import { InventoryDistributorComponent } from './features/distributor/inventory-distributor/inventory-distributor.component';
import { OrderListComponent } from './features/distributor/order-list/order-list.component';
import { UserListComponent } from './features/owner/user-list/user-list.component';
import { RetailerPlacedOrdersComponent } from './features/retailer/retailer-placed-orders/retailer-placed-orders.component';
import { RetailersOrderComponent } from './features/retailer/retailers-order/retailers-order.component';


const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'distributor',
    component: InventoryDistributorComponent
  },
  {
    path: 'distributor-orders',
    component: OrderListComponent
  },
  {
    path: 'retailer-placed-orders',
    component: RetailerPlacedOrdersComponent
  },
  {
    path: 'retailers-orders',
    component: RetailersOrderComponent
  },
  {
    path: 'customer-orders',
    component: MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
