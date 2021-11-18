import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { Medicine, MedicineBase } from 'src/app/shared/models/medicine.model';
import { ContractService } from 'src/app/shared/services/contract.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})
export class InventoryViewComponent implements OnInit {

  medicine!: Medicine;
  oldQuantity!: number;
  oldPrice!: number;
  oldName!: string;
  isRetailer = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private contractService: ContractService,
    private dataService: DataService) {
    if (config?.data?.isRetailer) {
      this.isRetailer = config.data.isRetailer;
    }
    if (config?.data?.medicine) {
      this.medicine = config.data.medicine;
      this.oldName = this.medicine.name;
    }
  }

  ngOnInit(): void {
    if (this.isRetailer) {
      this.getRetailerMedicineInfo();
    } else {
      this.getDistributorMedicineInfo();
    }
  }

  async getDistributorMedicineInfo() {
    const blockMedicine = await this.contractService.getMedicineByIdOfDistributor(this.medicine.id);
    this.medicine.quantity = blockMedicine.quantity;
    this.medicine.price = blockMedicine.price / 10000;
    this.oldQuantity = blockMedicine.quantity;
    this.oldPrice = blockMedicine.price / 10000;
  }

  async getRetailerMedicineInfo() {
    const blockMedicine = await this.contractService.getMedicineByIdOfRetailer(this.medicine.id);
    this.medicine.quantity = blockMedicine.quantity;
    this.medicine.price = blockMedicine.price / 10000;
    this.oldPrice = blockMedicine.price / 10000;
  }

  disableSave() {
    return this.isRetailer
      ? +this.medicine.quantity === 0 && !(this.oldPrice !== this.medicine.price)
      : this.medicine.recalled && !(this.oldName !== this.medicine.name || this.oldPrice !== this.medicine.price
        || this.oldQuantity !== this.medicine.quantity);
  }

  async editInventory() {
    if (this.isRetailer) {
      if (this.oldPrice !== this.medicine.price) {
        await this.contractService.updatePriceOfInventoryByRetailer(this.medicine.id, this.medicine.price);
        this.closeDialogBox(true);
      }
    } else {
      if (this.oldPrice !== this.medicine.price || this.oldQuantity !== this.medicine.quantity) {
        await this.contractService.updateInventoryByDistibuter(this.medicine.id, this.medicine.quantity, this.medicine.price);
      }
      if (this.oldName !== this.medicine.name) {
        const medicine: MedicineBase = {
          id: this.medicine.id,
          name: this.medicine.name,
          address: this.contractService.account
        };

        this.dataService.updateMedicineByDistributor(medicine).subscribe(() => {
          this.closeDialogBox(true);
        });
      } else {
        this.closeDialogBox(true);
      }
    }
  }

  async recallInventory() {
    await this.contractService.recallInventory(this.medicine.id);

    this.dataService.recallMedicine(this.medicine.id, this.contractService.account).subscribe(() => {
      this.closeDialogBox(true);
    });
  }

  closeDialogBox(value: boolean = false) {
    this.ref.close(value);
  }

}
