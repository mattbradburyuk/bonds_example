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


// ********** bring in helpers ***********

var Struct_ref_test = require(root+mushroom_config.structure.helper_output_directory+'Struct_ref_test_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;

// ********** Promise chain *************


get_args()
    .then(Struct_ref_test.get_my_test_structs)
    .then(Comprom.end_success,Comprom.end_error);


function get_args(){
    return new Promise(function (resolve,reject){
        var args = [2,2,{from: cb}];
        resolve(args);
    });
}


