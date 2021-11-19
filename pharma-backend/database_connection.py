from pymongo import MongoClient


def get_database(connectionString, data_base_name):

    client = MongoClient(connectionString)

    return client[data_base_name]