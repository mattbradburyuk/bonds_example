


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


var Contract = require(root+mushroom_config.structure.helper_output_directory+'check_mapping_exists_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;


// Contract.check_key(['key_2']).then(Comprom.end_success,Comprom.end_error)

var proms = [];

for (var i = 0; i<10; i++)
{
    var key = 'key_' + i
    proms[i] = Contract.check_struct_key([key])
}


Promise.all(proms).then(print_output)


function print_output(output) {

    for (var i = 0; i < 10; i++) {
        console.log("key_", i, ": ", output[i].toString())
    }

}


