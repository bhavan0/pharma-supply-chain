import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private accountService: AccountService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const role = route.data.role as string;
        return new Promise((resolve) => {
            const userRole = this.accountService.userRole;
            if (userRole === +role) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

}
