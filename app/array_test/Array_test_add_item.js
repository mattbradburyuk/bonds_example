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


var My_array = require(root+mushroom_config.structure.helper_output_directory+'Array_test_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;

var con = My_array.get_contract()

// console.log(con);

console.log(con.get_array_len.call())

console.log(con.get_array_item.call(0))

// con.add_array_item.sendTransaction({from: cb, gas: 300000}, callback)
//
//
// function callback(e,r){
//     console.log("callback:", e,r)
// }

My_array.add_array_item([{from: cb, gas: 300000}]).then(Comprom.end_success,Comprom.end_error)

