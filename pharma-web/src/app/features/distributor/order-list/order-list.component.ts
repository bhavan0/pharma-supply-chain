import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { Order } from 'src/app/shared/models/order.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { DataService } from 'src/app/shared/services/data.service';
import { OrderViewComponent } from '../../../shared/components/order-view/order-view.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DialogService]
})
export class OrderListComponent implements OnInit {

  cols: any;
  searchText = '';
  orders: Order[] = [];
  orderViewRef: any;

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
    this.getDistributorOrders();
  }

  async getDistributorOrders() {
    const account = await this.accountService.connectAndGetAccount();
    this.dataService.getDistributorOrders(account).subscribe(data => {
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
        this.getDistributorOrders();
      }
    });
  }

}
