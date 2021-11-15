import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng';
import { Medicine, MedicineBase } from 'src/app/shared/models/medicine.model';
import { ContractService } from 'src/app/shared/services/contract.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-distributor-inventory',
  templateUrl: './add-distributor-inventory.component.html',
  styleUrls: ['./add-distributor-inventory.component.scss']
})
export class AddDistributorInventoryComponent implements OnInit {


  medicine: Medicine = new Medicine();
  constructor(
    private contractService: ContractService,
    private dataService: DataService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

  disableSave(): boolean {
    return this.medicine.medicineId === null || this.medicine.name === null || this.medicine?.price === 0 || this.medicine?.quantity === 0;
  }

  async addInventory() {
    await this.contractService.addInventoryByDistibuter(this.medicine.medicineId, this.medicine.quantity, this.medicine.price);
    const medicine: MedicineBase = {
      medicineId: this.medicine.medicineId,
      name: this.medicine.name,
      address: this.contractService.account
    };

    this.dataService.addMedicineByDistributor(medicine).subscribe(() => {
      this.closeDialogBox(true);
    });
  }

  closeDialogBox(value: boolean = false) {
    this.ref.close(value);
  }

}
