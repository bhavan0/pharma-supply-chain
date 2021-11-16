import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AllUsersResponse } from "../models/all-user-response.model";
import { MedicineBase } from "../models/medicine.model";
import { OrdersResponse } from "../models/orders-response.model";
import { UserMedicineReposne } from "../models/user-medicine-response.model";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiBaseUrl = 'http://localhost:5001/';

    constructor(private httpClient: HttpClient) {
    }

    //#region Owner

    getAllUsers(): Observable<AllUsersResponse> {
        const url = 'get-all-users';
        return this.getData<AllUsersResponse>(url);
    }

    addUser(data: UserModel): Observable<any> {
        const url = 'add-user';
        return this.postData<AllUsersResponse>(url, data);
    }

    getRoleOfUser(address: string): Observable<any> {
        const url = 'get-role';
        const req = {
            'address': address
        };
        return this.postData<any>(url, req);
    }

    //#endregion Owner

    //#region Distributor

    getAllUsersMedicines(address: string): Observable<UserMedicineReposne> {
        const url = 'get-user-medicines';
        const data = {
            'address': address
        };
        return this.postData<UserMedicineReposne>(url, data);
    }

    addMedicineByDistributor(medicine: MedicineBase): Observable<MedicineBase> {
        const url = 'add-medicine';
        const med = {
            'medicineId': medicine.id,
            'name': medicine.name,
            'address': medicine.address
        }
        return this.postData<MedicineBase>(url, med)
    }

    updateMedicineByDistributor(medicine: MedicineBase): Observable<MedicineBase> {
        const url = 'update-medicine';
        return this.postData<MedicineBase>(url, medicine)
    }

    getDistributorOrders(address: string): Observable<OrdersResponse> {
        const url = 'get-distributor-orders';
        const data = {
            'address': address
        };
        return this.postData<OrdersResponse>(url, data);
    }

    confirmDistributorOrder(distributorAddress: string, retailerAddress: string, orderId: number, medicineId: number): Observable<any> {
        const url = 'confirm-order-distributor';
        const data = {
            'distributorAddress': distributorAddress,
            'orderId': orderId,
            'retailerAddress': retailerAddress,
            'medicineId': +medicineId
        };
        return this.postData<any>(url, data);
    }

    getAllDistributors(): Observable<AllUsersResponse> {
        const url = 'get-all-distributors';
        return this.getData<AllUsersResponse>(url);
    }

    //#endregion Distributor

    //#region Retailer

    getAllRetailers(): Observable<AllUsersResponse> {
        const url = 'get-all-retailers';
        return this.getData<AllUsersResponse>(url);
    }

    addRetailerOrder(distributorAddress: string, retailerAddress: string, orderId: number): Observable<any> {
        const url = 'add-retailer-order';
        const data = {
            'distributorAddress': distributorAddress,
            'orderId': orderId,
            'retailerAddress': retailerAddress
        };
        return this.postData<any>(url, data);
    }

    getRetailerPlacedOrders(retailerAddress: string): Observable<OrdersResponse> {
        const url = 'get-retailer-placed-orders';
        const data = {
            'address': retailerAddress
        };
        return this.postData<OrdersResponse>(url, data);
    }

    getRetailersOrders(retailerAddress: string): Observable<OrdersResponse> {
        const url = 'get-retailers-orders';
        const data = {
            'address': retailerAddress
        };
        return this.postData<OrdersResponse>(url, data);
    }

    //#endregion Retailer

    //#region Customer

    getCustomerOrders(customerAddress: string): Observable<OrdersResponse> {
        const url = 'get-customer-orders';
        const data = {
            'address': customerAddress
        };
        return this.postData<OrdersResponse>(url, data);
    }

    addCustomerOrder(customerAddress: string, retailerAddress: string, orderId: number): Observable<any> {
        const url = 'add-customer-order';
        const data = {
            'customerAddress': customerAddress,
            'orderId': orderId,
            'retailerAddress': retailerAddress
        };
        return this.postData<any>(url, data);
    }

    //#endregion

    private getData<T>(apiUrl: string): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.get<T>(url);
    }

    private postData<T>(apiUrl: string, data: any): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.post<T>(url, data);
    }
}