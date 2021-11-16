import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "./account.service";
import { DataService } from "./data.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private accountService: AccountService,
        private dataService: DataService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        let role = route.data.role as string;
        return new Promise(async (resolve) => {
            const account = await this.accountService.connectAndGetAccount()
            this.dataService.getRoleOfUser(account).subscribe(data => {
                if (data.role == role) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

}