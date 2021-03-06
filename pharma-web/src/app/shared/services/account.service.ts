import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    account = '';
    userRole!: number;

    constructor(
        private router: Router,
        private dataService: DataService) {
    }

    async connectAndGetAccount(): Promise<string> {
        window.web3 = await this.connect();
        this.account = window.web3.currentProvider.selectedAddress;

        return new Promise((resolve) => {
            this.dataService.getRoleOfUser(this.account).subscribe(data => {
                this.userRole = +data.role;
                resolve(this.account);
            });
        });
    }

    async checkAccountChange() {
        window.ethereum.on('accountsChanged', () => {
            this.router.navigateByUrl('/dashboard').then(() => {
                this.account = '';
                window.location.reload();
            });
        });
    }

    private async connect() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Acccounts now exposed
                return web3;
            } catch (error) {
                console.error(error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // Use Mist/MetaMask's provider.
            const web3 = window.web3;
            console.log('Injected web3 detected.');
            return web3;
        }
        // Fallback to localhost; use dev console port by default...
        else {
            const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
            const web3 = new Web3(provider);
            console.log('No web3 instance injected, using Local web3.');
            return web3;
        }
    }
}
