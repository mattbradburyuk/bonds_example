
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


var Trades = require(root+mushroom_config.structure.helper_output_directory+'Tt5_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;


var starting_block = web3.eth.blockNumber

console.log("starting block:", starting_block)

var data = []

// new_trades()

edit_trades()


function new_trades(){

    var parser = parse({delimiter: ','}, callback)

    fs.createReadStream('./app/Tt5/csv_trade_sources_100_at_10_per_10_blocks.csv').pipe(parser);

    function callback(err, r) {

        data = r;
        var data_ind = 1;   // tracks which trades have been fired
        // console.log(data)
        console.log("input file length: ",data.length)

        var timer = setInterval(fire_txs,5000); // interval set below average block time

        function fire_txs(){

            var trade_row = data[data_ind];
            // console.log("trade_row[17]:", trade_row[17], " starting_block:", starting_block, " web3.eth.blockNumber: ", web3.eth.blockNumber, "trade_row[17]+ starting_block:",  parseInt(trade_row[17]) + starting_block)

            if (parseInt(trade_row[17]) + starting_block <= web3.eth.blockNumber){

                console.log("fire trade: ", trade_row[0]);
                Trades.new_trade([trade_row[0], {from: cb, gas: 300000}])

                data_ind++;
                if (data_ind == data.length){           // == takes account of header row as there is num trades + 1 rows in data
                    console.log("finishing at 100");
                    clearInterval(timer)
                }

            }else{
                console.log("nothing to fire this time")
            }



        }


        }
}

function edit_trades(){

    var parser = parse({delimiter: ','}, callback)

    fs.createReadStream('./app/Tt5/csv_trade_sources_100_at_1_per_1_block.csv').pipe(parser);

    function callback(err, r) {

        data = r;
        var data_ind = 1;   // tracks which trades have been fired
        // console.log(data)
        console.log(data.length)

        var timer = setInterval(fire_txs,2000); // interval set below average block time

        function fire_txs(){

            var trade_row = data[data_ind];
            // console.log("trade_row[17]:", trade_row[17], " starting_block:", starting_block, " web3.eth.blockNumber: ", web3.eth.blockNumber, "trade_row[17]+ starting_block:",  parseInt(trade_row[17]) + starting_block)

            if (parseInt(trade_row[17]) + starting_block <= web3.eth.blockNumber){

                console.log("fire trade: ", trade_row[0]);
                Trades.edit_trade([trade_row[0],trade_row[4],trade_row[5],trade_row[6],trade_row[7],trade_row[8],12345,{from:cb,gas:300000}])

                data_ind++;
                if (data_ind == data.length){           // == takes account of header row as there is num trades + 1 rows in data
                    console.log("finishing at 100");
                    clearInterval(timer)
                }

            }else{
                console.log("nothing to fire this time")
            }



        }


    }
}