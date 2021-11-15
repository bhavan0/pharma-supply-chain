const HDWalletProvider = require('truffle-hdwallet-provider');

 module.exports = {
  
 
   networks: {
  
   development: 
     {
        host: "localhost",
        port: 7545,
     gas: 5000,
     gasPrice: 60000,
        network_id: '*' // Match any network id
 
     },
   ropsten: {
       provider: function() {
       var mnemonic = "leg year safe tent when home jungle tennis reward recall mushroom reopen";//put ETH wallet 12 mnemonic code 
       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/8cf80ccb22dd4231b0b609cad3f58383");
       },
       gas: 4000000,
       network_id: '3'
       
     }  
 
   
   },
 
   // Set default mocha options here, use special reporters etc.
   mocha: {
   // timeout: 100000
   },
 
   // Configure your compilers
   compilers: {
   solc: {
     version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
     // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
     settings: {          // See the solidity docs for advice about optimization and evmVersion
    optimizer: {
      enabled: true,
      runs: 200
    },
     //  evmVersion: "byzantium"
     }
   }
   }
 }