// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./pharma-ERC20.sol";

contract PharmaContract is ERC20 {
    
    address private owner;
    string private _ERCname = "Pharma Token";
    string private _ERCsymbol = "PRM";
    uint private _ERCtotalSupply = 5000000000;
    uint private _ERCdecimal = 4;
    
    enum UserType{
        Distributor,
        Retailer
    }
    
    struct RoleData {
        mapping(address => bool) members;
    }
    
    struct DistributorMedicines {
        uint quantity;
        uint price;
    }
    
    struct RetailerMedicine {
        uint quantity;
        uint price;
        address distributor;
    }
    
    struct DistributorOrdersList {
        uint medicineId;
        uint quantity;
        uint amount;
        address retailer;
        bool confirmation;
    }

    struct RetailerOrdersList {
        uint medicineId;
        uint quantity;
        uint amount;
        address customer;
    }
    
    struct DistributorOrder {
        mapping(uint => DistributorOrdersList) order;
    }

    struct RetailerOrder {
        mapping(uint => RetailerOrdersList) order;
    }
    
    struct DistributorListOfMedicine {
        mapping(uint => DistributorMedicines) medicines;
    }
    
    struct RetailerListOfMedicine {
        mapping(uint => RetailerMedicine) medicines;
    }
    
    struct MedicinesHeld {
        address user;
        uint quantity;
        uint amountPaid;
    }
    
    struct Medicines {
        mapping(uint => MedicinesHeld[]) medicines;
    }
    
    mapping(UserType => RoleData) roles;
    
    mapping(address => DistributorListOfMedicine) inventoryOfDistributors;
    
    mapping(address => RetailerListOfMedicine) inventoryOfRetailers;
    
    mapping(address => DistributorOrder) distributorOrders;

    mapping(address => RetailerOrder) retailerOrders;
    
    mapping(address => Medicines) medicinesHeld;
    
    modifier onlyOwner {
        require(msg.sender == owner, 'Only Owner can call this function');
        _;
    }
    
    modifier onlyDistributor {
        require(roles[UserType.Distributor].members[msg.sender], 'Only Distributor can call this function');
        _;
    }
    
    modifier onlyRetailer {
        require(roles[UserType.Retailer].members[msg.sender], 'Only Retailer can call this function');
        _;
    }
    
    constructor () ERC20(_ERCname, _ERCsymbol, _ERCtotalSupply, _ERCdecimal)
    {
        owner = msg.sender;
    }
    
    function close() onlyOwner public{
        selfdestruct(payable(msg.sender));
    }
    
    // Used by owner to register Users
    function registerUser(address userAddress, uint amount, UserType role) onlyOwner public virtual returns (bool) {
        roles[role].members[userAddress] = true;
        _transfer(address(this), userAddress, amount);
        return true;
    }
    
    // Distributors add inventory
    function addInventoryByDistibuter(uint medicineId, uint quantity, uint price) onlyDistributor public virtual {
        inventoryOfDistributors[msg.sender].medicines[medicineId].quantity = quantity;
        inventoryOfDistributors[msg.sender].medicines[medicineId].price = price;
    }
    
    // Distributors update inventory
    function updateInventoryByDistibuter(uint medicineId, uint quantity, uint price) onlyDistributor public virtual {
        inventoryOfDistributors[msg.sender].medicines[medicineId].quantity = quantity;
        inventoryOfDistributors[msg.sender].medicines[medicineId].price = price;
    }
    
    // Retailer calls to create an Order to specified distributor
    function createRetailerOrder(address distributorAddress, uint medicineId, uint orderNo, uint quantity) onlyRetailer public virtual {
        distributorOrders[distributorAddress].order[orderNo].medicineId = medicineId;
        distributorOrders[distributorAddress].order[orderNo].quantity = quantity;
        distributorOrders[distributorAddress].order[orderNo].amount = quantity * inventoryOfDistributors[distributorAddress].medicines[medicineId].price;
        distributorOrders[distributorAddress].order[orderNo].retailer = msg.sender;
        distributorOrders[distributorAddress].order[orderNo].confirmation = false;
        approve(distributorAddress, distributorOrders[distributorAddress].order[orderNo].amount);
    }
    
    // Distributor calls to confirm a specific order no
    function confirmOrderByDistributor(uint orderNo) onlyDistributor public virtual {
        address retailerAddress = distributorOrders[msg.sender].order[orderNo].retailer;
        uint totalAmount = distributorOrders[msg.sender].order[orderNo].amount;
        
        transferFrom(retailerAddress, msg.sender, totalAmount);
        
        distributorOrders[msg.sender].order[orderNo].confirmation = true;
        
        uint quantity = distributorOrders[msg.sender].order[orderNo].quantity;
        uint medicineId = distributorOrders[msg.sender].order[orderNo].medicineId;
        
        inventoryOfDistributors[msg.sender].medicines[medicineId].quantity -= quantity;
        inventoryOfRetailers[distributorOrders[msg.sender].order[orderNo].retailer].medicines[medicineId].quantity += quantity;
        inventoryOfRetailers[distributorOrders[msg.sender].order[orderNo].retailer].medicines[medicineId].price = inventoryOfDistributors[msg.sender].medicines[medicineId].price;
        inventoryOfRetailers[distributorOrders[msg.sender].order[orderNo].retailer].medicines[medicineId].distributor = msg.sender;
        
        medicinesHeld[msg.sender].medicines[medicineId].push(MedicinesHeld(retailerAddress, quantity, totalAmount));
    }
    
    // Retailer calls to update any price of inventory he has
    function updatePriceOfInventoryByRetailer(uint medicineId, uint price) onlyRetailer public virtual {
        inventoryOfRetailers[msg.sender].medicines[medicineId].price = price;
    }
    
    // Returns the Medicine Info by ID of specified Distributor address
    function getMedicineByIdOfDistributor(uint medicineId, address distributorAddress) public virtual returns(uint quantity, uint price){
        return (inventoryOfDistributors[distributorAddress].medicines[medicineId].quantity, inventoryOfDistributors[distributorAddress].medicines[medicineId].price);
    }

    // Returns the Order Quantity and price by ID of specified Distributor address
    function getOrderInfoByIdOfDistributor(uint orderNo, address distributorAddress) public virtual returns(uint quantity, uint price, uint medicineId) {
        return (distributorOrders[distributorAddress].order[orderNo].quantity, distributorOrders[distributorAddress].order[orderNo].amount, distributorOrders[distributorAddress].order[orderNo].medicineId);
    }

    // Customer creates order for the specific Retailer
    function createCustomerOrder(address retailerAddress, uint medicineId, uint orderNo, uint quantity) public virtual {
        uint amount = quantity * inventoryOfRetailers[retailerAddress].medicines[medicineId].price;
        
        transfer(retailerAddress, amount);
        
        retailerOrders[retailerAddress].order[orderNo].medicineId = medicineId;
        retailerOrders[retailerAddress].order[orderNo].quantity = quantity;
        retailerOrders[retailerAddress].order[orderNo].customer = msg.sender;
        retailerOrders[retailerAddress].order[orderNo].amount = amount;
        inventoryOfRetailers[retailerAddress].medicines[medicineId].quantity -= quantity;
        
        address distributorAddress = inventoryOfRetailers[retailerAddress].medicines[medicineId].distributor;
        medicinesHeld[distributorAddress].medicines[medicineId].push(MedicinesHeld(msg.sender, quantity, amount));
    }

    // Returns the Order Quantity and price by ID of specified Retailer address
    function getOrderInfoByIdOfRetailer(uint orderNo, address retailerAddress) public virtual returns(uint quantity, uint price, uint medicineId) {
        return (retailerOrders[retailerAddress].order[orderNo].quantity, retailerOrders[retailerAddress].order[orderNo].amount, retailerOrders[retailerAddress].order[orderNo].medicineId);
    }

    // Returns the Medicine Info by ID of specified Distributor address
    function getMedicineByIdOfRetailer(uint medicineId, address retailerAddress) public virtual returns(uint quantity, uint price) {
        return (inventoryOfRetailers[retailerAddress].medicines[medicineId].quantity, inventoryOfRetailers[retailerAddress].medicines[medicineId].price);
    }
    
    // Called by distributor if he has to recall any medicine sold, will be paying back all the transactions already done.
    // Note: Retailer will get more money if he had already updated the price of medicine he had bought.
    function recallInventory(uint medicineId) onlyDistributor public virtual {
        uint len = medicinesHeld[msg.sender].medicines[medicineId].length;
        for (uint i = 0; i < len; i++){
            transfer(medicinesHeld[msg.sender].medicines[medicineId][i].user, medicinesHeld[msg.sender].medicines[medicineId][i].amountPaid);
            if(roles[UserType.Retailer].members[medicinesHeld[msg.sender].medicines[medicineId][i].user]){
                inventoryOfRetailers[medicinesHeld[msg.sender].medicines[medicineId][i].user].medicines[medicineId].quantity = 0;
                inventoryOfDistributors[msg.sender].medicines[medicineId].quantity = 0;
            }
        }
    }
}