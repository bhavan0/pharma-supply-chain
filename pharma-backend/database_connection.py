from pymongo import MongoClient


def get_database(data_base_name):

    CONNECTION_STRING = "mongodb+srv://testUser:TestUser@cluster0.mawxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    client = MongoClient(CONNECTION_STRING)

    return client[data_base_name]