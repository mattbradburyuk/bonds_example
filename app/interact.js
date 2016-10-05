// ********** imports ****************

var Web3 = require('web3');
var jayson = require('jayson');
var jsonfile = require("jsonfile");



// ********* get the config files  ************

var root = process.cwd();

var mc_path = root + "/.mushroom_config.js";
var mushroom_config = require(mc_path);

var cc_path = root + mushroom_config.structure.contract_config_location + mushroom_config.structure.contract_config;
var contract_config = require(cc_path);



// *********** set up web3 and rpc ****************

const web3  = new Web3();
var url = 'http://'+contract_config.rpc.host+':'+ contract_config.rpc.port;
web3.setProvider(new web3.providers.HttpProvider(url));
var rpc_client = jayson.client.http(url);

// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(rpc_client.options.host)




var Trades = require(root+mushroom_config.structure.helper_output_directory+'Trades_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

// console.log(Trades.get_dummy([{}]))
//
// console.log(Trades.get_trade([{}]))

var cb = web3.eth.coinbase;


Trades.get_trade([{}])
    .then(Comprom.unlock_acc)
    .then(set_args)
    .then(Trades.set_trade)
    .then(get_args)
    .then(Trades.get_trade)
    .then(set_args_proxy)
    .then(Trades.proxy_set_trade)
    .then(get_args)
    .then(Trades.get_trade)
    .then(Comprom.end_success,Comprom.end_error);


function get_args(){
    return new Promise(function (resolve,reject){
        var args = [{}];
        resolve(args);
    });
}

function set_args_proxy(){
    return new Promise(function(resolve,reject){
        var args = [{from:cb}];
        resolve(args)
    });
}


function set_args(){
        return new Promise(function(resolve,reject){
            var args = ["bond_2", "seller_2", 'buyer_2',{from:cb}];
            resolve(args)
    });
}



//
// // ********* unlock account *********
//
// function unlock_acc(pass_through){
//     console.log("\nunlock_acc called");
//     return new Promise(function (resolve,reject){
//
//         var prompt = require('prompt');
//
//         var schema = {
//             properties: {
//                 password: {
//                     message: 'Please enter password for coinbase account',
//                     required: true,
//                     hidden: true
//                 }
//             }
//         };
//
//         prompt.message = '';
//         prompt.start();
//
//         prompt.get(schema, function (err, result) {
//
//             console.log('Password input received...');
//
//             web3.personal.unlockAccount(web3.eth.accounts[0],result.password, callback);  // unlock accounts
//
//         });
//         function callback(e,r) {
//             if (e) {
//                 reject("unlock_acc error");
//             } else {
//                 console.log(" --->account unlocked");
//                 resolve(pass_through);
//             }
//         }
//     });
// }
//
// // *********end of promise chain markers **********
//
// function end_success(result) {
//     console.log("\nEnd result: ---> ",result); // "Stuff worked!"
//     // console.log("\n *********  end of script **********");
// }
// function end_error(err) {
//     console.log("\nEnd error: ---> ",err); // Error: "It broke"
//     // console.log("\n *********  end of script **********");
// }