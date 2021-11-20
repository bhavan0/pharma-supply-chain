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
    return this.medicine.id === undefined || this.medicine.id === null
      || this.medicine.name === undefined || this.medicine.name === null
      || this.medicine.price === undefined || this.medicine.price === null || this.medicine.price === 0
      || this.medicine.quantity === undefined || this.medicine.quantity === null || this.medicine.quantity === 0;
  }

  async addInventory() {
    await this.contractService.addInventoryByDistibutor(this.medicine.id, this.medicine.quantity, this.medicine.price);
    const medicine: MedicineBase = {
      id: this.medicine.id,
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
