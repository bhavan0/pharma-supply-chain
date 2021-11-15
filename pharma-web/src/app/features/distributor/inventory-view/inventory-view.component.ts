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

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private contractService: ContractService,
    private dataService: DataService) {
    if (config?.data?.medicine) {
      this.medicine = config.data.medicine;
      this.oldName = this.medicine.name;
    }
  }

  ngOnInit(): void {
    this.getMedicineInfo();
  }

  async getMedicineInfo() {
    const blockMedicine = await this.contractService.getMedicineByIdOfDistributor(this.medicine.medicineId);
    this.medicine.quantity = blockMedicine.quantity;
    this.medicine.price = blockMedicine.price;
    this.oldQuantity = blockMedicine.quantity;
    this.oldPrice = blockMedicine.price;
  }

  disableSave() {
    return !(this.oldName != this.medicine.name || this.oldPrice != this.medicine.price || this.oldQuantity != this.medicine.quantity)
  }

  async editInventory() {

    if (this.oldPrice != this.medicine.price || this.oldQuantity != this.medicine.quantity) {
      await this.contractService.updateInventoryByDistibuter(this.medicine.medicineId, this.medicine.quantity, this.medicine.price);
    }
    if (this.oldName != this.medicine.name) {
      const medicine: MedicineBase = {
        medicineId: this.medicine.medicineId,
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

  closeDialogBox(value: boolean = false) {
    this.ref.close(value);
  }

}
