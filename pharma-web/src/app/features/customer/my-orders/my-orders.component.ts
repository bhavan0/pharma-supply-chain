import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { OrderViewComponent } from 'src/app/shared/components/order-view/order-view.component';
import { Order } from 'src/app/shared/models/order.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { DataService } from 'src/app/shared/services/data.service';
import { CreateOrderComponent } from '../create-order/create-order.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [DialogService]
})
export class MyOrdersComponent implements OnInit {

  cols: any;
  searchText = '';
  orders: Order[] = [];
  orderViewRef: any;
  createOrderViewRef: any;

  constructor(
    private dataService: DataService,
    private accountService: AccountService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'orderId', header: 'Order ID' },
      { field: 'retailerAddress', header: 'By' },
      { field: 'confirmed', header: 'Status' }
    ];
    this.getOrdersOfCustomer();
  }

  async getOrdersOfCustomer() {
    const account = await this.accountService.connectAndGetAccount();
    this.dataService.getCustomerOrders(account).subscribe(data => {
      this.orders = data.orders;
    });
  }

  onOrderSelection(order: Order) {
    this.orderViewRef = this.dialogService.open(OrderViewComponent, {
      header: 'Order',
      width: '680px',
      data: { order: order, displayConfirm: false, displayAddress: 1 }
    });

    this.orderViewRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.getOrdersOfCustomer();
      }
    });
  }

  createRetailerOrder() {
    this.createOrderViewRef = this.dialogService.open(CreateOrderComponent, {
      header: 'Create Order',
      width: '680px'
    });
  }

}
