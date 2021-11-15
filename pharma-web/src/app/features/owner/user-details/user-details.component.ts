import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { UserModel } from 'src/app/shared/models/user.model';
import { ContractService } from 'src/app/shared/services/contract.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user!: UserModel;
  balance = 0;
  role = '';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private contractService: ContractService) {
    if (config?.data?.user) {
      this.user = config.data.user;
      this.role = this.user.role === '0' ? 'Distributor' : 'Retailer';
    }
  }

  ngOnInit(): void {
    this.getBalanceOfUser();
  }

  async getBalanceOfUser() {
    this.balance = await this.contractService.getBalanceOfUser(this.user.address);
  }

  closeDialogBox() {
    this.ref.close();
  }

}
