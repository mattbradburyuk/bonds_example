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


var Trades = require(root+mushroom_config.structure.helper_output_directory+'Trades_test_2_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;


console.log(cb)


Comprom.unlock_acc()
    .then(set_args_1)
    .then(Trades.new_trade)
    .then(set_args_none)
    .then(Trades.get_num_trades)
    // .then(set_args_2)
    // .then(Trades.edit_trade)
    // .then(set_args_3)
    // .then(Trades.get_trade_detail)
    .then(Comprom.end_success,Comprom.end_error);


function set_args_none(x){
    return new Promise(function(resolve,reject){
        var args = [{}];
        resolve(args)
    });
}

function set_args_1(x){
    return new Promise(function(resolve,reject){
        var args = ["trade_0",{from:cb}];
        resolve(args)
    });
}

function set_args_2(x){
    return new Promise(function(resolve,reject){
        var args = ["trade_0", "inst_1", "buyer_1", "seller_1", 100, 123, 123456789,{from:cb}];
        resolve(args)
    });
}

function set_args_3(x){
    return new Promise(function(resolve,reject){
        var args = ["trade_0",{}];
        resolve(args)
    });
}