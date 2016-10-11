// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"trade_id","type":"string"}],"name":"new_trade","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"t","type":"uint256"}],"name":"get_trade_name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_num_trades","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"trade_id","type":"string"},{"name":"instrument","type":"string"},{"name":"buyer","type":"string"},{"name":"seller","type":"string"},{"name":"amount","type":"uint256"},{"name":"bond_price","type":"uint256"},{"name":"settlement_date","type":"uint256"}],"name":"edit_trade","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"trade_id","type":"string"}],"name":"get_trade_detail","outputs":[{"name":"instrument","type":"string"},{"name":"buyer","type":"string"},{"name":"seller","type":"string"},{"name":"amount","type":"uint256"},{"name":"bond_price","type":"uint256"},{"name":"settlement_date","type":"uint256"},{"name":"version","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]');
var address = '0x87a34f2c24e1de4db83f11b07de0cdad6ad3ac0c';
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


// ********* new_trade - send_tx **********

Contract.new_trade = function (args) {
        
        console.log("\nnew_trade called")
        console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

        return new Promise(function (resolve, reject) {

            contract.new_trade.sendTransaction(args[0],args[1], callback);

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


// ********* get_trade_name - Call **********

Contract.get_trade_name = function (args) {

    console.log("\nget_trade_name called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

    return new Promise(function (resolve, reject) {

        contract.get_trade_name.call(args[0],args[1], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_trade_name response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* get_num_trades - Call **********

Contract.get_num_trades = function (args) {

    console.log("\nget_num_trades called")
    console.log(" ---> args[0]:", args[0])

    return new Promise(function (resolve, reject) {

        contract.get_num_trades.call(args[0], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_num_trades response: ", response)
                resolve(response)
            }
        }
    });
};


// ********* edit_trade - send_tx **********

Contract.edit_trade = function (args) {
        
        console.log("\nedit_trade called")
        console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2]," ---> args[3]:", args[3]," ---> args[4]:", args[4]," ---> args[5]:", args[5]," ---> args[6]:", args[6]," ---> args[7]:", args[7])

        return new Promise(function (resolve, reject) {

            contract.edit_trade.sendTransaction(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7], callback);

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


// ********* get_trade_detail - Call **********

Contract.get_trade_detail = function (args) {

    console.log("\nget_trade_detail called")
    console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1])

    return new Promise(function (resolve, reject) {

        contract.get_trade_detail.call(args[0],args[1], callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> get_trade_detail response: ", response)
                resolve(response)
            }
        }
    });
};


module.exports = Contract;