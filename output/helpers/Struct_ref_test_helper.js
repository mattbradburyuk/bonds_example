// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":false,"inputs":[],"name":"set_up_data","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"main","type":"uint256"},{"name":"sub","type":"uint256"}],"name":"get_my_test_structs","outputs":[{"name":"n","type":"uint256"},{"name":"s","type":"string"},{"name":"sn","type":"uint256"},{"name":"ss","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0x341a01f42736a70a12f106632851dff53e7fb6c6';
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


// ********* set_up_data - send_tx **********

Contract.set_up_data = function (args) {
        
        console.log("\nset_up_data called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.set_up_data.sendTransaction(args[0], callback);

            var timer;

            function callback(e,tx_ref) {
                if (e) {
                    reject(e);
                } else {
                    console.log(" ---> tx_ref:", tx_ref)
                    timer = setInterval(check_mined, 500, tx_ref)

                }
            }

            function check_mined(tx_ref) {
                // console.log("tx_ref in check_mined:", tx_ref);
                var tx = web3.eth.getTransaction(tx_ref.toString());
                // console.log("tx.blockNumber: ", tx.blockNumber);

                if(tx.blockNumber != null) {
                    console.log(" ---> tx mined in block: ", tx.blockNumber);
                    clearInterval(timer);
                    resolve(tx_ref);
                }
            }

        });
};


// ********* get_my_test_structs - Call **********

Contract.get_my_test_structs = function (args) {

    console.log("\nget_my_test_structs called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2])

    return new Promise(function (resolve, reject) {

        contract.get_my_test_structs.call(args[0],args[1],args[2], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_my_test_structs response: ", response)
                resolve(response)
            }
        }
    });
};


module.exports = Contract;