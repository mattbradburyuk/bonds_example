// ********** imports ****************

var Web3 = require('web3');
var jayson = require('jayson');
var jsonfile = require("jsonfile");
var fs = require('fs');
var parse = require('csv-parse');
var Table = require('cli-table');


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


var Trades = require(root+mushroom_config.structure.helper_output_directory+'Tt4_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;


Comprom.tic([{}])
    .then(Trades.get_num_trades)
    .then(get_all_trade_names)
    .then(get_trade_details)
    // .then(display_data_in_table)
    .then(Comprom.toc)
    // .then(Comprom.end_success,Comprom.end_error)




function get_all_trade_names(args){
    return new Promise(function(resolve,reject){

        var proms = [];
        for (var i = 0; i<args;i++){
            proms[i] = Trades.get_trade_name([i,{}])
        }
        Promise.all(proms).then(resolve,reject)
    });
}


function get_trade_details(args){
    return new Promise(function(resolve,reject){

        var proms = [];
        for (var i in args){

            proms[i] = Trades.get_trade_detail([args[i]])
        }

        Promise.all(proms).then(resolve,reject)

    });
}


function display_data_in_table(args){

    return new Promise(function (resolve,reject){

        var data = args;

        var num_rows = data.length;

        var start_col = 0;
        var end_col =data[0].length;
        var num_cols = end_col - start_col;

        var col_widths = [];
        for (var i = 0; i < num_cols; i++) {
            col_widths.push(20);
        }

        // console.log("data:", data[0][1])

        var table = new Table({
            head: ['instrument', 'buyer', 'seller', 'amount', 'bond_price', 'settlement_date', 'version']
            , colWidths: col_widths
        });



        for (var i = 0; i < num_rows; i++) {
            table.push(data[i].slice(start_col, end_col));
        }

        console.log(table.toString());

        resolve()


    });


}

