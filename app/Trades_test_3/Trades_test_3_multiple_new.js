
/*
 * for use with Trade_test_3.sol
 *
 *
 * Creates multiple trades with incremental trade names (eg trade_0, trade_1 etc...)
 *
 * */




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


var Trades = require(root+mushroom_config.structure.helper_output_directory+'Trades_test_3_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;


Comprom.unlock_acc()
    .then(new_incr_trade)
    .then(new_incr_trade)
    // .then(new_incr_trade)
    // .then(new_incr_trade)
    .then(Comprom.end_success,Comprom.end_error);




function new_incr_trade(){

    return new Promise(function (resolve,reject){

        console.log("\nnew_incr_trade called")

        Trades.get_num_trades([{}])
            .then(Comprom.log_pass_through)
            .then(make_args)
            .then(Comprom.log_pass_through)
            .then(Trades.new_trade)
            .then(function(){console.log("new_incr_trade finished"); resolve()});


    });


    function make_args(num_trades) {
        return new Promise(function (resolve, reject) {
            var next_trade = 'trade_' + num_trades.toString()
            console.log("next_trade:", next_trade)
            resolve([next_trade, {from: cb, gas: 300000}])
        });

    }
}


