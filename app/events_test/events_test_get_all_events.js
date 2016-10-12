


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


var Contract = require(root+mushroom_config.structure.helper_output_directory+'Events_test_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;

var events = Contract.get_contract().allEvents({fromBlock:0, toBLock: 'latest'}).get(callback)

function callback(e,r){

    if(e){
        console.log(e)
    }else{

        for (var i in r){

            // console.log(i, ":", r[i]);
            console.log("message",i,":",web3.toAscii(r[i].args.message), "in block", r[i].blockNumber)

        }

    }


}
