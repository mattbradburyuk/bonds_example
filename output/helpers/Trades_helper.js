// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"get_dummy","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_trade","outputs":[{"name":"a","type":"string"},{"name":"b","type":"string"},{"name":"c","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"proxy_set_trade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"string"},{"name":"b","type":"string"},{"name":"s","type":"string"}],"name":"set_trade","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0xe021ae15151d5d3bd621593e21b0246d7ffb490e';
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


// ********* get_dummy - Call **********

Contract.get_dummy = function (args) {

    console.log("\nget_dummy called")
    console.log(" ---> args[0]:", args[0])

    return new Promise(function (resolve, reject) {

        contract.get_dummy.call(args[0], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_dummy response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* get_trade - Call **********

Contract.get_trade = function (args) {

    console.log("\nget_trade called")
    console.log(" ---> args[0]:", args[0])

    return new Promise(function (resolve, reject) {

        contract.get_trade.call(args[0], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_trade response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* proxy_set_trade - send_tx **********

Contract.proxy_set_trade = function (args) {
        
        console.log("\nproxy_set_trade called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.proxy_set_trade.sendTransaction(args[0], callback);

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


// ********* set_trade - send_tx **********

Contract.set_trade = function (args) {
        
        console.log("\nset_trade called")
        console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2]," ---> args[3]:", args[3])

        return new Promise(function (resolve, reject) {

            contract.set_trade.sendTransaction(args[0],args[1],args[2],args[3], callback);

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