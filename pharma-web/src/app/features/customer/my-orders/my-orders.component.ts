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
  selectedOrder: any = null;

  constructor(
    private dataService: DataService,
    private accountService: AccountService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'orderId', header: 'Order ID' },
      { field: 'retailerAddress', header: 'Retailer' }
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
      data: { order, displayConfirm: false, displayAddress: 4 }
    });

    this.orderViewRef.onClose.subscribe(() => {
      this.selectedOrder = null;
    });
  }

  createCustomerOrder() {
    this.createOrderViewRef = this.dialogService.open(CreateOrderComponent, {
      header: 'Create Order',
      width: '680px'
    });

    this.createOrderViewRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.getOrdersOfCustomer();
      }
    });
  }

}
