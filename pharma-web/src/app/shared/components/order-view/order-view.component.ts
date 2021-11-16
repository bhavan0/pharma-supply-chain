import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { Order } from 'src/app/shared/models/order.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { ContractService } from 'src/app/shared/services/contract.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  order!: Order;
  displayConfirm = false;
  displayAddress = 1;
  medicineId!: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private contractService: ContractService,
    private dataService: DataService,
    private accountService: AccountService) {
    if (config?.data?.displayConfirm) {
      this.displayConfirm = config.data.displayConfirm;
    }
    if (config?.data?.displayAddress) {
      this.displayAddress = config.data.displayAddress;
    }
    if (config?.data?.order) {
      this.order = config.data.order;
    }
  }

  ngOnInit(): void {
    if (this.displayAddress === 1) {
      this.getOrderInfo();
    } else if (this.displayAddress === 2) {
      this.getRetailerPlacedOrderInfo();
    } else if (this.displayAddress === 3 || this.displayAddress === 4) {
      this.getCustomerPlacedOrderInfo();
    }
  }

  async getOrderInfo() {
    const blockOrder = await this.contractService.getOrderInfoByIdOfDistributor(this.order.orderId);
    this.order.quantity = blockOrder.quantity;
    this.order.amount = blockOrder.price / 10000;
    this.medicineId = blockOrder.medicineId;
  }

  async getRetailerPlacedOrderInfo() {
    const blockOrder = await this.contractService.getOrderInfoByIdOfDistributor(this.order.orderId, this.order.distributorAddress);
    this.order.quantity = blockOrder.quantity;
    this.order.amount = blockOrder.price / 10000;
  }

  async getCustomerPlacedOrderInfo() {
    const blockOrder = await this.contractService.getOrderInfoByIdOfRetailer(this.order.orderId, this.order.retailerAddress);
    this.order.quantity = blockOrder.quantity;
    this.order.amount = blockOrder.price / 10000;
  }

  async confirmOrder() {
    const account = await this.accountService.connectAndGetAccount();
    await this.contractService.confirmOrderByDistributor(this.order.orderId);

    this.dataService.confirmDistributorOrder(account, this.order.retailerAddress, this.order.orderId, this.medicineId).subscribe(data => {
      this.closeDialogBox(true);
    });
  }

  closeDialogBox(value: boolean = false) {
    this.ref.close(value);
  }

}
