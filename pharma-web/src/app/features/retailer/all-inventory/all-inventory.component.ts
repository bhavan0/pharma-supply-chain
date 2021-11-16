import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { InventoryViewComponent } from 'src/app/shared/components/inventory-view/inventory-view.component';
import { Medicine } from 'src/app/shared/models/medicine.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-all-inventory',
  templateUrl: './all-inventory.component.html',
  styleUrls: ['./all-inventory.component.scss'],
  providers: [DialogService]
})
export class AllInventoryComponent implements OnInit {

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

  onMedicineSelect(medicine: Medicine) {
    this.inventoryViewRef = this.dialogService.open(InventoryViewComponent, {
      header: 'Inventory',
      width: '680px',
      data: { medicine, isRetailer: true }
    });

    this.inventoryViewRef.onClose.subscribe(() => {
      this.selectedMedicine = null;
    });
  }

}
