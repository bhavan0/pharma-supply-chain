import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule, CardModule, DialogModule, DynamicDialogModule, InputTextModule, MenubarModule, TableModule, ToastModule } from 'primeng';
import { HeaderComponent } from './shared/components/header/header.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { RegisterComponent } from './features/owner/register/register.component';
import { UserListComponent } from './features/owner/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HighlightTextPipe } from './shared/pipes/highlight-text.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { UserDetailsComponent } from './features/owner/user-details/user-details.component';
import { InventoryDistributorComponent } from './features/distributor/inventory-distributor/inventory-distributor.component';
import { AddDistributorInventoryComponent } from './features/distributor/add-distributor-inventory/add-distributor-inventory.component';
import { InventoryViewComponent } from './shared/components/inventory-view/inventory-view.component';
import { OrderListComponent } from './features/distributor/order-list/order-list.component';
import { OrderViewComponent } from './shared/components/order-view/order-view.component';
import { RetailerPlacedOrdersComponent } from './features/retailer/retailer-placed-orders/retailer-placed-orders.component';
import { AddOrderComponent } from './features/retailer/add-order/add-order.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RetailersOrderComponent } from './features/retailer/retailers-order/retailers-order.component';
import { MyOrdersComponent } from './features/customer/my-orders/my-orders.component';
import { CreateOrderComponent } from './features/customer/create-order/create-order.component';
import { AllInventoryComponent } from './features/retailer/all-inventory/all-inventory.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageHeaderComponent,
    RegisterComponent,
    UserListComponent,
    HighlightTextPipe,
    UserDetailsComponent,
    InventoryDistributorComponent,
    AddDistributorInventoryComponent,
    InventoryViewComponent,
    OrderListComponent,
    OrderViewComponent,
    RetailerPlacedOrdersComponent,
    AddOrderComponent,
    RetailersOrderComponent,
    MyOrdersComponent,
    CreateOrderComponent,
    AllInventoryComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    HttpClientModule,
    DropdownModule,
    InputNumberModule,
    CardModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterComponent,
    UserDetailsComponent,
    AddDistributorInventoryComponent,
    InventoryViewComponent,
    OrderViewComponent,
    AddOrderComponent,
    CreateOrderComponent
  ]
})
export class AppModule { }
