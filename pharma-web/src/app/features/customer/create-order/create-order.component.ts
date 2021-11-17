import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng';
import { Medicine } from 'src/app/shared/models/medicine.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { ContractService } from 'src/app/shared/services/contract.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  selectedRetailer!: UserModel;
  retailers: UserModel[] = [];
  medicines: Medicine[] = [];
  selectedMedicine!: Medicine;
  selectedQuantity!: number;
  maxQuantity = 0;
  singleUnitPrice = 0;
  orderId!: number;
  medicineId!: number;

  constructor(
    private contractService: ContractService,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllRetailers();
  }

  getAllRetailers() {
    this.dataService.getAllRetailers().subscribe(data => {
      this.retailers = data.users;
    });
  }

  async getRetailerMedicines() {
    this.dataService.getAllUsersMedicines(this.selectedRetailer.address).subscribe(data => {
      this.medicines = data.medicines;
    });
  }

  async getMedicineInfo() {
    const blockMedicine = await this.contractService.getMedicineByIdOfRetailer(this.selectedMedicine.id, this.selectedRetailer.address);
    this.maxQuantity = blockMedicine.quantity;
    this.singleUnitPrice = blockMedicine.price / 10000;
  }

  async placeOrder() {
    await this.contractService.createCustomerOrder(this.selectedRetailer.address, this.selectedMedicine.id,
      this.orderId, this.selectedQuantity);
    const account = this.accountService.account;
    this.dataService.addCustomerOrder(account, this.selectedRetailer.address, this.orderId).subscribe(() => {
      this.closeDialogBox(true);
    });
  }

  closeDialogBox(value = false) {
    this.ref.close(value);
  }

  disableSave() {
    return !this.selectedRetailer || !this.selectedMedicine || this.maxQuantity === 0 || !this.orderId;
  }

  get finalAmount(): number {
    return this.selectedQuantity * this.singleUnitPrice;
  }

}
