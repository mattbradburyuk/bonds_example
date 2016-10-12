// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = "http://192.168.99.100:8541";
web3.setProvider(new web3.providers.HttpProvider(url));


// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('[{"constant":false,"inputs":[],"name":"send_message","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"trigger_event_2","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"trigger_event_1","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"message","type":"bytes32"}],"name":"My_message","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"message","type":"bytes32"}],"name":"Event_1","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"message","type":"bytes32"}],"name":"Event_2","type":"event"}]');
var address = '0x19b6daddea41bf86297341e905314f9689c39d20';
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


// ********* send_message - send_tx **********

Contract.send_message = function (args) {
        
        console.log("\nsend_message called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.send_message.sendTransaction(args[0], callback);

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


// ********* trigger_event_2 - send_tx **********

Contract.trigger_event_2 = function (args) {
        
        console.log("\ntrigger_event_2 called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.trigger_event_2.sendTransaction(args[0], callback);

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


// ********* trigger_event_1 - send_tx **********

Contract.trigger_event_1 = function (args) {
        
        console.log("\ntrigger_event_1 called")
        console.log(" ---> args[0]:", args[0])

        return new Promise(function (resolve, reject) {

            contract.trigger_event_1.sendTransaction(args[0], callback);

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


// ********* My_message - send_tx **********

Contract.My_message = function (args) {
        
        console.log("\nMy_message called")
        console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2])

        return new Promise(function (resolve, reject) {

            contract.My_message.sendTransaction(args[0],args[1],args[2], callback);

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


// ********* Event_1 - send_tx **********

Contract.Event_1 = function (args) {
        
        console.log("\nEvent_1 called")
        console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2])

        return new Promise(function (resolve, reject) {

            contract.Event_1.sendTransaction(args[0],args[1],args[2], callback);

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


// ********* Event_2 - send_tx **********

Contract.Event_2 = function (args) {
        
        console.log("\nEvent_2 called")
        console.log(" ---> args[0]:", args[0]," ---> args[1]:", args[1]," ---> args[2]:", args[2])

        return new Promise(function (resolve, reject) {

            contract.Event_2.sendTransaction(args[0],args[1],args[2], callback);

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