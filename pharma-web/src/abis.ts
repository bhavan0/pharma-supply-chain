export const eventAddress = '0x2793B5AdF84A9b84024A7d1aB2297B9B446F43C6';

export const eventAbi = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'close',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'userAddress',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      },
      {
        'internalType': 'enum PharmaContract.UserType',
        'name': 'role',
        'type': 'uint8'
      }
    ],
    'name': 'registerUser',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      }
    ],
    'name': 'addInventoryByDistibuter',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      }
    ],
    'name': 'updateInventoryByDistibuter',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'getDistributors',
    'outputs': [
      {
        'internalType': 'address[]',
        'name': '',
        'type': 'address[]'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'getRetailers',
    'outputs': [
      {
        'internalType': 'address[]',
        'name': '',
        'type': 'address[]'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'distributorAddress',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'orderNo',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      }
    ],
    'name': 'createRetailerOrder',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'orderNo',
        'type': 'uint256'
      }
    ],
    'name': 'confirmOrderByDistributor',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      }
    ],
    'name': 'updatePriceOfInventoryByRetailer',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'distributorAddress',
        'type': 'address'
      }
    ],
    'name': 'getMedicineByIdOfDistributor',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'orderNo',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'distributorAddress',
        'type': 'address'
      }
    ],
    'name': 'getOrderInfoByIdOfDistributor',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'retailerAddress',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'orderNo',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      }
    ],
    'name': 'createCustomerOrder',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'orderNo',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'retailerAddress',
        'type': 'address'
      }
    ],
    'name': 'getOrderInfoByIdOfRetailer',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'medicineId',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'retailerAddress',
        'type': 'address'
      }
    ],
    'name': 'getMedicineByIdOfRetailer',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'quantity',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];
