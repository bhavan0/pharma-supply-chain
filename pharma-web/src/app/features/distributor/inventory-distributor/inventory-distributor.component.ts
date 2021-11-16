import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/shared/models/medicine.model';
import { DataService } from 'src/app/shared/services/data.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { DialogService } from 'primeng';
import { AddDistributorInventoryComponent } from '../add-distributor-inventory/add-distributor-inventory.component';
import { InventoryViewComponent } from 'src/app/shared/components/inventory-view/inventory-view.component';

@Component({
  selector: 'app-inventory-distributor',
  templateUrl: './inventory-distributor.component.html',
  styleUrls: ['./inventory-distributor.component.scss'],
  providers: [DialogService]
})
export class InventoryDistributorComponent implements OnInit {

  cols: any;
  medicines: Medicine[] = [];
  addInventoryRef: any;
  inventoryViewRef: any;
  searchText = '';
  selectedMedicine: any = null;

  constructor(
    private dataService: DataService,
    private accountService: AccountService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Medicine Id' },
      { field: 'name', header: 'Name' }
    ];
    this.getAllMedicines();
  }

  async getAllMedicines() {
    const account = await this.accountService.connectAndGetAccount();
    this.dataService.getAllUsersMedicines(account).subscribe(data => {
      this.medicines = data.medicines;
    });
  }

  addInventory() {
    this.addInventoryRef = this.dialogService.open(AddDistributorInventoryComponent, {
      header: 'Add Inventory',
      width: '680px'
    });

    this.addInventoryRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.getAllMedicines();
      }
    });
  }

  onMedicineSelect(medicine: Medicine) {
    this.inventoryViewRef = this.dialogService.open(InventoryViewComponent, {
      header: 'Inventory',
      width: '680px',
      data: { medicine, isRetailer: false }
    });

    this.inventoryViewRef.onClose.subscribe(() => {
      this.selectedMedicine = null;
    });
  }

}
