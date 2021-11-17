import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng';
import { Medicine } from 'src/app/shared/models/medicine.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { ContractService } from 'src/app/shared/services/contract.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  selectedDistributor!: UserModel;
  distributors: UserModel[] = [];
  medicines: Medicine[] = [];
  selectedMedicine!: Medicine;
  selectedQuantity!: number;
  maxQuantity = 0;
  singleUnitPrice = 0;
  orderId!: number;

  constructor(
    private contractService: ContractService,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllDistributors();
  }

  getAllDistributors() {
    this.dataService.getAllDistributors().subscribe(data => {
      this.distributors = data.users;
    });
  }

  async getDistributorMedicines() {
    this.dataService.getAllUsersMedicines(this.selectedDistributor.address).subscribe(data => {
      this.medicines = data.medicines;
    });
  }

  async getMedicineInfo() {
    const blockMedicine = await this.contractService
      .getMedicineByIdOfDistributor(this.selectedMedicine.id, this.selectedDistributor.address);
    this.maxQuantity = blockMedicine.quantity;
    this.singleUnitPrice = blockMedicine.price / 10000;
  }

  async placeOrder() {
    await this.contractService
      .createRetailerOrder(this.selectedDistributor.address, this.selectedMedicine.id, this.orderId, this.selectedQuantity);
    const account = this.accountService.account;
    this.dataService.addRetailerOrder(this.selectedDistributor.address, account, this.orderId).subscribe(() => {
      this.closeDialogBox(true);
    });
  }

  closeDialogBox(value = false) {
    this.ref.close(value);
  }

  disableSave() {
    return !this.selectedDistributor || !this.selectedMedicine || this.maxQuantity === 0 || !this.orderId;
  }

  get finalAmount(): number {
    return this.selectedQuantity * this.singleUnitPrice;
  }
}
