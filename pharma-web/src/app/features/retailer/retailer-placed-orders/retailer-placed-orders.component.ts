import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { OrderViewComponent } from 'src/app/shared/components/order-view/order-view.component';
import { Order } from 'src/app/shared/models/order.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { DataService } from 'src/app/shared/services/data.service';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-retailer-placed-orders',
  templateUrl: './retailer-placed-orders.component.html',
  styleUrls: ['./retailer-placed-orders.component.scss'],
  providers: [DialogService]
})
export class RetailerPlacedOrdersComponent implements OnInit {

  cols: any;
  searchText = '';
  orders: Order[] = [];
  orderViewRef: any;
  createOrderViewRef: any;
  selectedOrder: any = null

  constructor(
    private dataService: DataService,
    private accountService: AccountService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'orderId', header: 'Order ID' },
      { field: 'distributorAddress', header: 'To' },
      { field: 'confirmed', header: 'Status' }
    ];

    this.getRetailerPlacedOrders();
  }

  async getRetailerPlacedOrders() {
    const account = await this.accountService.connectAndGetAccount();
    this.dataService.getRetailerPlacedOrders(account).subscribe(data => {
      if (data.orders as any !== '') {
        this.orders = data.orders;
      }
    });
  }

  onOrderSelection(order: Order) {
    this.orderViewRef = this.dialogService.open(OrderViewComponent, {
      header: 'Order',
      width: '680px',
      data: { order: order, displayConfirm: false, displayAddress: 2 }
    });

    this.orderViewRef.onClose.subscribe(() => {
      this.selectedOrder = null;
    });
  }

  createRetailerOrder() {
    this.createOrderViewRef = this.dialogService.open(AddOrderComponent, {
      header: 'Create Order',
      width: '680px'
    });

    this.createOrderViewRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.getRetailerPlacedOrders();
      }
    });
  }

}
