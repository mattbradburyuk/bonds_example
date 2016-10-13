// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"check_struct_key","outputs":[{"name":"ret_val","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"check_key","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0xaf839c98829340775a1c16ab39a0270777fa11d8';
var contract = web3.eth.contract(abi).at(address);

function Contract(){

}

Contract.get_abi = function(){
    return abi
}

Contract.get_address = function(){

    return address
}

Contract.get_contract = function(){
    return contract
}


// ********* check_struct_key - Call **********

Contract.check_struct_key = function (args) {

    console.log("\ncheck_struct_key called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

    return new Promise(function (resolve, reject) {

        contract.check_struct_key.call(args[0],args[1], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> check_struct_key response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* check_key - Call **********

Contract.check_key = function (args) {

    console.log("\ncheck_key called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

    return new Promise(function (resolve, reject) {

        contract.check_key.call(args[0],args[1], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> check_key response: ", response)
                resolve(response)
            }
        }
    });
};


module.exports = Contract;