import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { OrderViewComponent } from 'src/app/shared/components/order-view/order-view.component';
import { Order } from 'src/app/shared/models/order.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-retailers-order',
  templateUrl: './retailers-order.component.html',
  styleUrls: ['./retailers-order.component.scss'],
  providers: [DialogService]
})
export class RetailersOrderComponent implements OnInit {

  cols: any;
  searchText = '';
  orders: Order[] = [];
  orderViewRef: any;
  selectedOrder: any = null;

  constructor(
    private dataService: DataService,
    private accountService: AccountService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'orderId', header: 'Order ID' },
      { field: 'customerAddress', header: 'By' }
    ];

    this.getOrdersOfRetailer();
  }

  async getOrdersOfRetailer() {
    const account = await this.accountService.connectAndGetAccount();
    this.dataService.getRetailersOrders(account).subscribe(data => {
      this.orders = data.orders;
    });
  }

  onOrderSelection(order: Order) {
    this.orderViewRef = this.dialogService.open(OrderViewComponent, {
      header: 'Order',
      width: '680px',
      data: { order: order, displayConfirm: false, displayAddress: 3 }
    });

    this.orderViewRef.onClose.subscribe((value: boolean) => {
      this.selectedOrder = null;
      if (value) {
        this.getOrdersOfRetailer();
      }
    });
  }

}
