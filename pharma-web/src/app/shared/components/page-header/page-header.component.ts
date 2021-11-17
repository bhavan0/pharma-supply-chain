import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  userName = '';

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.userName = this.accountService.account;
  }

}
