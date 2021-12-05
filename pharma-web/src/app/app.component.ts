import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng';
import { AccountService } from './shared/services/account.service';
import { ErrorService } from './shared/services/error.service';
import { SuccessService } from './shared/services/success.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'pharma-web';

  account = '';
  loaded = false;

  constructor(
    private accountService: AccountService,
    private errorService: ErrorService,
    private messageService: MessageService,
    private successService: SuccessService) {

  }

  ngOnInit(): void {
    this.loaded = false;
    this.getAccount();
    this.displayErrorMessage();
    this.displaySuccessMessage();
  }

  async getAccount() {
    this.account = await this.accountService.connectAndGetAccount();
    this.accountService.checkAccountChange();
    this.loaded = true;
    console.log(this.account);
  }

  displayErrorMessage() {
    this.errorService.onRecieveErrorMessage().subscribe(data => {
      this.messageService.add({ severity: 'error', summary: data });
    });
  }

  displaySuccessMessage() {
    this.successService.onRecieveSuccessMessage().subscribe(data => {
      this.messageService.add({ severity: 'success', summary: data });
    });
  }
}
