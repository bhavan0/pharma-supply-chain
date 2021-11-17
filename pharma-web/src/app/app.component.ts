import { Component, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pharma-web';

  account = '';
  loaded = false;

  constructor(
    private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.loaded = false;
    this.getAccount();
  }

  async getAccount() {
    this.account = await this.accountService.connectAndGetAccount();
    this.accountService.checkAccountChange();
    this.loaded = true;
    console.log(this.account);
  }
}
