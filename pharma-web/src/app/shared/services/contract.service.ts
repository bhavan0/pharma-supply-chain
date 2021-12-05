import { Injectable } from '@angular/core';
import { eventAbi, eventAddress } from '../../../abis.js';
import { AccountService } from './account.service.js';
import { ErrorService } from './error.service.js';
import { SuccessService } from './success.service.js';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    pharmaContract: any;
    account = '';

    constructor(
        private accountService: AccountService,
        private errorService: ErrorService,
        private successService: SuccessService
    ) {
    }

    getAccount() {
        this.account = this.accountService.account;
        this.pharmaContract = new window.web3.eth.Contract(eventAbi, eventAddress);
    }

    async registerUser(newAccountId: string, initialAmount: number, accountType: string): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.registerUser(newAccountId, +initialAmount * 10000, accountType).send({ from: this.account });
                this.successService.updateSuccessMessage('User Added');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async getBalanceOfUser(address: string): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.balanceOf(address).call({ from: this.account });
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async addInventoryByDistibutor(medicineId: number, quantity: number, price: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.addInventoryByDistibutor(medicineId, quantity, price * 10000).send({ from: this.account });
                this.successService.updateSuccessMessage('Inventory Added');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async updateInventoryByDistibutor(medicineId: number, quantity: number, price: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.updateInventoryByDistibutor(medicineId, quantity, price * 10000).send({ from: this.account });
                this.successService.updateSuccessMessage('Inventory Updated');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async getMedicineByIdOfDistributor(medicineId: number, distributorAddress?: string): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.getMedicineByIdOfDistributor(medicineId, distributorAddress ?? this.account).call({ from: this.account });
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async confirmOrderByDistributor(orderId: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.confirmOrderByDistributor(orderId).send({ from: this.account });
                this.successService.updateSuccessMessage('Order Confirmed');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async getOrderInfoByIdOfDistributor(orderId: number, distributorAddress?: string): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.getOrderInfoByIdOfDistributor(orderId, distributorAddress ?? this.account).call({ from: this.account });
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async getOrderInfoByIdOfRetailer(orderId: number, retailerAddress?: string): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.getOrderInfoByIdOfRetailer(orderId, retailerAddress ?? this.account).call({ from: this.account });
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async createRetailerOrder(distributorAddress: string, medicineId: number, orderNo: number, quantity: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.createRetailerOrder(distributorAddress, medicineId, orderNo, quantity).send({ from: this.account });
                this.successService.updateSuccessMessage('Retailer Order created');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async createCustomerOrder(retailerAddress: string, medicineId: number, orderNo: number, quantity: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.createCustomerOrder(retailerAddress, medicineId, orderNo, quantity).send({ from: this.account });
                this.successService.updateSuccessMessage('Customer Order created');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async getMedicineByIdOfRetailer(medicineId: number, retailerAddress?: string): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.getMedicineByIdOfRetailer(medicineId, retailerAddress ?? this.account).call({ from: this.account });
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async updatePriceOfInventoryByRetailer(medicineId: number, price: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.updatePriceOfInventoryByRetailer(medicineId, price * 10000).send({ from: this.account });
                this.successService.updateSuccessMessage('Inventory udpated');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async recallInventory(medicineId: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.recallInventory(medicineId).send({ from: this.account });
                this.successService.updateSuccessMessage('Inventory Recall successful');
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

    async getAllMedicineHolders(medicineId: number): Promise<any> {
        this.getAccount();
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.pharmaContract
                    .methods.getAllMedicineHolders(medicineId).call({ from: this.account });
                resolve(res);
            }
            catch (ex) {
                console.log(ex);
                this.errorService.updateErrorMessage((ex as any).code);
                reject();
            }
        });
    }

}
