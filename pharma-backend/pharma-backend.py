from flask import Flask
from flask_restful import Resource, Api, request
from flask_cors import CORS
from database_connection import get_database
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
api = Api(app)
CORS(app, allow_headers=['Content-Type', 'Access-Control-Allow-Origin',
                         'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'])


class Pharma(Resource):

    # region Owner

    @app.route('/get-all-users', methods=['GET'])
    def getAllUsers():
        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        allUsers = collection_subscriptions.find(
            {}, {'name': 1, 'address': 1, 'role': 1, '_id': 0})
        allUsersList = list(allUsers)

        allUsersResponse = []
        for user in allUsersList:
            allUsersResponse.append({
                "name": user['name'],
                "address": user['address'],
                "role": user['role']
            })

        return {'users': allUsersResponse}, 200

    @app.route('/add-user', methods=['POST'])
    def addUser():
        userRequest = request.get_json()
        userName = userRequest['name']
        role = userRequest['role']
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        user = {
            'name': userName,
            'role': role,
            'address': address,
            'medicines': [],
            'ordersPlaced': [],
            'orders': []
        }

        collection_subscriptions.insert_one(user)

        return {'Success': 'User Added'}, 200

    @app.route('/get-role', methods=['POST'])
    def getRoleOfUser():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userRole = collection_subscriptions.find_one(
            {"address": address}, {'role': 1, '_id': 0})

        if userRole is None:
            userRole = {
                'role': '2'
            }

        return userRole, 200

    @app.route('/add-owner', methods=['POST'])
    def addOwner():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        user = {
            'name': 'owner',
            'role': 99,
            'address': address
        }

        collection_subscriptions.insert_one(user)

        return {'Success': 'Owner Added'}, 200

    # endregion Owner

    # region Distributor

    @app.route('/get-user-medicines', methods=['POST'])
    def getUserMedicines():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        medicine = json.loads(json.dumps(userData['medicines']))

        return {'medicines': medicine}, 200

    @app.route('/add-medicine', methods=['POST'])
    def addMedicine():
        userRequest = request.get_json()
        address = userRequest['address']
        medicineId = userRequest['medicineId']
        name = userRequest['name']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        medicines = json.loads(json.dumps(userData['medicines']))

        med = {
            'id': medicineId,
            'name': name
        }

        medicines.append(med)

        print(medicines)

        collection_subscriptions.update_one({"_id": userData['_id']}, {
            "$set": {"medicines": medicines}})

        return {'Success': 'Medicine Added'}, 200

    @app.route('/update-medicine', methods=['POST'])
    def updateMedicine():
        userRequest = request.get_json()
        address = userRequest['address']
        medicineId = userRequest['medicineId']
        name = userRequest['name']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        medicines = json.loads(json.dumps(userData['medicines']))

        med = next(
            x for x in medicines if x['id'] == medicineId)

        med['name'] = name

        collection_subscriptions.update_one({"_id": userData['_id']}, {
            "$set": {"medicines": medicines}})

        return {'Success': 'Medicine Updated'}, 200

    @app.route('/get-distributor-orders', methods=['POST'])
    def getDistributorOrders():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        orders = json.loads(json.dumps(userData['orders']))

        return {'orders': orders}, 200

    @app.route('/get-all-distributors', methods=['GET'])
    def getAllDistributors():
        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        allUsers = collection_subscriptions.find(
            {"role": "0"}, {'name': 1, 'address': 1, 'role': 1, '_id': 0})
        allUsersList = list(allUsers)

        return {'users': allUsersList}, 200

    @app.route('/confirm-order-distributor', methods=["POST"])
    def confirmOrder():
        userRequest = request.get_json()
        distributorAddress = userRequest['distributorAddress']
        orderId = userRequest['orderId']
        retailerAddress = userRequest['retailerAddress']
        medicineId = userRequest['medicineId']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        # Update Distributor Document
        distributorData = collection_subscriptions.find_one(
            {"address": distributorAddress})

        orders = json.loads(json.dumps(distributorData['orders']))

        order = next(
            x for x in orders if x['orderId'] == orderId)

        order['confirmed'] = True

        collection_subscriptions.update_one({"_id": distributorData['_id']}, {
            "$set": {"orders": orders}})

        # Update Retailer Document
        retailerData = collection_subscriptions.find_one(
            {"address": retailerAddress})

        orders = json.loads(json.dumps(retailerData['ordersPlaced']))

        order = next(
            x for x in orders if x['orderId'] == orderId)

        order['confirmed'] = True

        # Get Medicine Details from Distributor
        medicines = json.loads(json.dumps(distributorData['medicines']))

        med = next(
            x for x in medicines if x['id'] == medicineId)

        retailerMedicines = json.loads(json.dumps(retailerData['medicines']))

        if not any(obj['id'] == medicineId for obj in retailerMedicines):
            retailerMedicines.append(med)

        collection_subscriptions.update_one({"_id": retailerData['_id']}, {
            "$set": {"ordersPlaced": orders, 'medicines': retailerMedicines}})

        return {'Success': 'Order Confirmed'}, 200

    # endregion Distributor

    # region Retailer

    @app.route('/get-all-retailers', methods=['GET'])
    def getAllRetailers():
        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        allUsers = collection_subscriptions.find(
            {"role": "1"}, {'name': 1, 'address': 1, 'role': 1, '_id': 0})
        allUsersList = list(allUsers)

        return {'users': allUsersList}, 200

    @app.route('/add-retailer-order', methods=['POST'])
    def addRetailerOrder():
        userRequest = request.get_json()
        distributorAddress = userRequest['distributorAddress']
        orderId = userRequest['orderId']
        retailerAddress = userRequest['retailerAddress']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        # Update Distributor Document

        distributorData = collection_subscriptions.find_one(
            {"address": distributorAddress})

        orders = json.loads(json.dumps(distributorData['orders']))

        orderD = {
            'orderId': orderId,
            'retailerAddress': retailerAddress,
            'confirmed': False
        }

        orders.append(orderD)

        collection_subscriptions.update_one({"_id": distributorData['_id']}, {
            "$set": {"orders": orders}})

        # Update Retailer Document

        retailerData = collection_subscriptions.find_one(
            {"address": retailerAddress})

        orders = json.loads(json.dumps(retailerData['ordersPlaced']))

        orderR = {
            'orderId': orderId,
            'distributorAddress': distributorAddress,
            'confirmed': False
        }

        orders.append(orderR)

        collection_subscriptions.update_one({"_id": retailerData['_id']}, {
            "$set": {"ordersPlaced": orders}})

        return {'Success': 'Order Added'}, 200

    @app.route('/get-retailer-placed-orders', methods=['POST'])
    def getRetailerPlacedOrders():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        orders = json.loads(json.dumps(userData['ordersPlaced']))

        return {'orders': orders}, 200

    @app.route('/get-retailers-orders', methods=['POST'])
    def getRetailersOrders():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        orders = json.loads(json.dumps(userData['orders']))

        return {'orders': orders}, 200

    # endregion Retailer

    # region Customer

    @app.route('/get-customer-orders', methods=['POST'])
    def getCustomerOrders():
        userRequest = request.get_json()
        address = userRequest['address']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        userData = collection_subscriptions.find_one({"address": address})

        orders = []

        if userData != None and len(userData) > 0:
            orders = json.loads(json.dumps(userData['ordersPlaced']))

        return {'orders': orders}, 200

    @app.route('/add-customer-order', methods=['POST'])
    def addCustomerOrder():
        userRequest = request.get_json()
        customerAddress = userRequest['customerAddress']
        orderId = userRequest['orderId']
        retailerAddress = userRequest['retailerAddress']

        pharmaDB = get_database('pharma')
        collection_subscriptions = pharmaDB['users']

        # Update Retailer Document

        retailerData = collection_subscriptions.find_one(
            {"address": retailerAddress})

        orders = json.loads(json.dumps(retailerData['orders']))

        orderR = {
            'orderId': orderId,
            'customerAddress': customerAddress
        }

        orders.append(orderR)

        collection_subscriptions.update_one({"_id": retailerData['_id']}, {
            "$set": {"orders": orders}})

        # Update Customer Document

        customerData = collection_subscriptions.find_one(
            {"address": customerAddress})

        if customerData is None:
            customerData = {
                'name': 'C1',
                'role': '2',
                'address': customerAddress,
                'ordersPlaced': []
            }

            collection_subscriptions.insert_one(customerData)
            customerData = collection_subscriptions.find_one(
                {"address": customerAddress})

        orders = json.loads(json.dumps(customerData['ordersPlaced']))

        orderC = {
            'orderId': orderId,
            'retailerAddress': retailerAddress
        }

        orders.append(orderC)

        collection_subscriptions.update_one({"_id": customerData['_id']}, {
            "$set": {"ordersPlaced": orders}})

        return {'Success': 'Order Added'}, 200

    # endregion Customer


api.add_resource(Pharma, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
