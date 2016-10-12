// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"get_array_len","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"ind","type":"uint256"}],"name":"get_array_item","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"add_array_item","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0x8c06bf9a1aead2e38efb340ee61337f8d46b4475';
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


// ********* get_array_len - Call **********

Contract.get_array_len = function (args) {

    console.log("\nget_array_len called")
    console.log(" ---> args[0]:", args[0])

    return new Promise(function (resolve, reject) {

        contract.get_array_len.call(args[0], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_array_len response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* get_array_item - Call **********

Contract.get_array_item = function (args) {

    console.log("\nget_array_item called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

    return new Promise(function (resolve, reject) {

        contract.get_array_item.call(args[0],args[1], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_array_item response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* add_array_item - send_tx **********

Contract.add_array_item = function (args) {
        
        console.log("\nadd_array_item called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.add_array_item.sendTransaction(args[0], callback);

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


module.exports = Contract;