// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"t","type":"string"}],"name":"get_trade","outputs":[{"name":"instrument","type":"string"},{"name":"buyer","type":"string"},{"name":"seller","type":"string"},{"name":"amount","type":"uint256"},{"name":"bond_price","type":"uint256"},{"name":"settlement_date","type":"uint256"},{"name":"version","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"create_dummy_trades","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"t","type":"string"},{"name":"cv","type":"uint256"}],"name":"get_trade_version","outputs":[{"name":"instrument","type":"string"},{"name":"buyer","type":"string"},{"name":"seller","type":"string"},{"name":"amount","type":"uint256"},{"name":"bond_price","type":"uint256"},{"name":"settlement_date","type":"uint256"},{"name":"version","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0xb2d954232ee71353c5db1b5f962f525ffc94a3d4';
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


// ********* get_trade - Call **********

Contract.get_trade = function (args) {

    console.log("\nget_trade called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

    return new Promise(function (resolve, reject) {

        contract.get_trade.call(args[0],args[1], callback);

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


// ********* create_dummy_trades - send_tx **********

Contract.create_dummy_trades = function (args) {
        
        console.log("\ncreate_dummy_trades called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.create_dummy_trades.sendTransaction(args[0], callback);

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


// ********* get_trade_version - Call **********

Contract.get_trade_version = function (args) {

    console.log("\nget_trade_version called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2])

    return new Promise(function (resolve, reject) {

        contract.get_trade_version.call(args[0],args[1],args[2], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_trade_version response: ", response)
                resolve(response)
            }
        }
    });
};


module.exports = Contract;