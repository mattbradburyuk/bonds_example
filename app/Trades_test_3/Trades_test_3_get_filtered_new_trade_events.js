


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


var Contract = require(root+mushroom_config.structure.helper_output_directory+'Trades_test_3_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;

// New_trade_event() must take 3 arguments in the correct order or it won't work
// arg 1: filters for values in ***INDEXED*** fields, it won't work without the index in the solidity event declaration

// Note: Indexing does not work directly on array types (eg dynamic string), there's something about using sha3 hash but I didn't dig into that, i just used a uint instead, ie:in .sol:
// 'event New_trade_event(address indexed sender, uint indexed trade_no, string trade_id);'

// arg 2: event filter object
// if left blank it doesn't go back and get historic blocks therefore need to specify block range eg : {fromBlock:0, toBlock:'latest'}

// arg 3: callback
// callback gets fired for each event found, in contrast to allEvents which returns an array of events


var events = Contract.get_contract().New_trade_event({trade_no: '2'},{fromBlock:0, toBlock:'latest'},callback)

function callback(e,r){

    if(e){
        console.log(e)
    }else{
        // console.log("r", r );

            console.log(r.event,"for",r.args.trade_id, "in block", r.blockNumber)
    }

}
