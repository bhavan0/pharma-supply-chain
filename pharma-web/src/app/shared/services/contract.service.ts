import { Injectable } from '@angular/core';
import { eventAbi, eventAddress } from '../../../abis.js';
import { AccountService } from './account.service.js';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    pharmaContract: any;
    account = '';

    constructor(private accountService: AccountService) {
    }

    async getAccount() {
        this.account = await this.accountService.connectAndGetAccount();
        this.pharmaContract = new window.web3.eth.Contract(eventAbi, eventAddress);
    }

    async registerUser(newAccountId: string, initialAmount: number, accountType: string): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.registerUser(newAccountId, +initialAmount * 10000, accountType).send({ from: this.account });
            resolve(res);
        });
    }

    async getBalanceOfUser(address: string): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.balanceOf(address).call({ from: this.account });
            resolve(res);
        });
    }

    async addInventoryByDistibuter(medicineId: number, quantity: number, price: number): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.addInventoryByDistibuter(medicineId, quantity, price * 10000).send({ from: this.account });
            resolve(res);
        });
    }

    async updateInventoryByDistibuter(medicineId: number, quantity: number, price: number): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.updateInventoryByDistibuter(medicineId, quantity, price * 10000).send({ from: this.account });
            resolve(res);
        });
    }

    async getMedicineByIdOfDistributor(medicineId: number, distributorAddress?: string): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.getMedicineByIdOfDistributor(medicineId, distributorAddress ?? this.account).call({ from: this.account });
            resolve(res);
        });
    }

    async confirmOrderByDistributor(orderId: number): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.confirmOrderByDistributor(orderId).send({ from: this.account });
            resolve(res);
        });
    }

    async getOrderInfoByIdOfDistributor(orderId: number, distributorAddress?: string): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.getOrderInfoByIdOfDistributor(orderId, distributorAddress ?? this.account).call({ from: this.account });
            resolve(res);
        });
    }

    async getOrderInfoByIdOfRetailer(orderId: number, retailerAddress?: string): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.getOrderInfoByIdOfRetailer(orderId, retailerAddress ?? this.account).call({ from: this.account });
            resolve(res);
        });
    }

    async createRetailerOrder(distributorAddress: string, medicineId: number, orderNo: number, quantity: number): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.createRetailerOrder(distributorAddress, medicineId, orderNo, quantity).send({ from: this.account });
            resolve(res);
        });
    }

    async createCustomerOrder(retailerAddress: string, medicineId: number, orderNo: number, quantity: number): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.createCustomerOrder(retailerAddress, medicineId, orderNo, quantity).send({ from: this.account });
            resolve(res);
        });
    }

    async getMedicineByIdOfRetailer(medicineId: number, retailerAddress?: string): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.getMedicineByIdOfRetailer(medicineId, retailerAddress ?? this.account).call({ from: this.account });
            resolve(res);
        });
    }

    async updatePriceOfInventoryByRetailer(medicineId: number, price: number): Promise<any> {
        await this.getAccount();
        return new Promise(async (resolve) => {
            const res = await this.pharmaContract
                .methods.updatePriceOfInventoryByRetailer(medicineId, price * 10000).send({ from: this.account });
            resolve(res);
        });
    }

}
