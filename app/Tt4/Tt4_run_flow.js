
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

//
Comprom.unlock_acc()
    .then(get_csv_data)
    .then(fire_new_trade_promises)
    // .then(display_data_in_table)
    .then(Comprom.end_success,Comprom.end_error)

// get_csv_data().then(fire_new_trade_promises)


function get_csv_data() {

    return new Promise(function (resolve, reject) {

        var parser = parse({delimiter: ','}, callback)

        fs.createReadStream('./app/Tt4/csv_trades_source.csv').pipe(parser);

        function callback(err, data) {
            resolve(data)
        }
    })
}

function fire_new_trade_promises(args){
    return new Promise(function (resolve, reject){
        var trade_data = args;

        var proms = [];

        for (var i = 1; i< trade_data.length;i++){
            // console.log(trade_data[i][0]);

            proms[i] = new_and_edit(trade_data[i])
        }

        console.log("proms:", proms)
        Promise.all(proms)
            // .then(Comprom.log_pass_through)
            .then(pass_back_results);



        function pass_back_results(args){
            console.log("fire_new_trade_promises - pass_back_reslut: ",args)
                resolve(args)
        }


    });
}

function new_and_edit(trade_data){
    return new Promise(function (resolve,reject){


        Trades.new_trade([trade_data[0], {from: cb, gas: 300000}])
            .then(set_args)
            .then(Trades.edit_trade)
            .then(pass_back_results)

        function set_args(){
            return new Promise(function(resolve, reject){

                // function edit_trade(string trade_id, string instrument, string buyer, string seller, uint amount, uint bond_price, uint settlement_date)
                var args = [trade_data[0],trade_data[4],trade_data[5],trade_data[6],trade_data[7],trade_data[8],12345,{from:cb,gas:300000}]
                // console.log("args:", args)
                resolve(args)
            });
        }

        function pass_back_results(args){
            console.log("new_and_edit pass_back_results args: ",args)
            resolve(trade_data[0] + ' done')
        }
    });
}
















function display_data_in_table(args){

    return new Promise(function (resolve,reject){

        var data = args;

        var start_col = 0;
        var end_col = 11;
        var num_cols = end_col - start_col;

        var col_widths = [];
        for (var i = 0; i < num_cols; i++) {
            col_widths.push(20);
        }

        var table = new Table({
            head: data[0].slice(start_col, end_col)
            , colWidths: col_widths
        });

        for (var i = 1; i < 10; i++) {
            table.push(data[i].slice(start_col, end_col));
        }

        console.log(table.toString());


    });


}





