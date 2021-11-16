import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng';
import { UserModel } from 'src/app/shared/models/user.model';
import { ContractService } from 'src/app/shared/services/contract.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newAddress = '';
  role: any;
  initialAmount!: number;
  name = '';

  roles: any = [];

  constructor(
    private contractService: ContractService,
    public ref: DynamicDialogRef,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.roles = [
      { name: 'Distributor', code: '0' },
      { name: 'Retailer', code: '1' }
    ];
  }

  disableSave(): boolean {
    return this.newAddress === '' || this.name === '' || !this.role || !this.initialAmount || this.initialAmount === 0;
  }

  async addUser() {
    await this.contractService.registerUser(this.newAddress, this.initialAmount, this.role.code);
    const userModel: UserModel = {
      address: this.newAddress,
      name: this.name,
      role: this.role.code
    };

    this.dataService.addUser(userModel).subscribe(() => {
      this.closeDialogBox(true);
    });
  }

  closeDialogBox(value: boolean = false) {
    this.ref.close(value);
  }

}
