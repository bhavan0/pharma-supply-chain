import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  balance = 0;

  constructor(
    private accountService: AccountService,
    private contractService: ContractService
  ) { }

  ngOnInit(): void {
    this.getBalanceOfUser();
  }

  async getBalanceOfUser() {
    const account = this.accountService.account;
    const blockBalance = await this.contractService.getBalanceOfUser(account);
    this.balance = +blockBalance / 10000;
  }

}
