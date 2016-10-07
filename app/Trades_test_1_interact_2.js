
// NOT WORKING

// trying to avoid retyping code - working out how to retain var values when subsequent promises are called


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


var Trades = require(root+mushroom_config.structure.helper_output_directory+'Trades_test_1_helper.js')
var Comprom = require(root+mushroom_config.structure.helper_output_directory+'common_promises_helper.js')

var cb = web3.eth.coinbase;

// ********** Promise chain *************



// can closures make this more efficient, with less duplicated code <----- think about this




log_trade_versions()

// Trades.get_trade_version(['trade_1',2,{}]).then(display_trade_table)


// ************ define promises **************


function log_trade_versions() {

    var trade_id
    var cv
    var data

    var f1 = get_trade_from_user(trade_id, cv, data)
    var f2 = get_trade_current_version(trade_id, cv, data)
    var f3 = get_trade_versions(trade_id, cv, data)
    var f4 = log_vars(trade_id, cv, data)
    var f5 = display_table(trade_id, cv, data)


    f1().then(f2).then(f3).then(f4).then(f5)


    // get_trade_from_user()
    //     .then(get_trade_current_version)
    //     .then(get_trade_versions)
    //     // .then(log_vars)
    //     .then(display_table)

}

 function get_trade_from_user(trade_id, cv, data) {


     return function _get_trade_from_user() {

         return new Promise(function (resolve, reject) {

             var prompt = require('prompt');
             var schema = {
                 properties: {
                     trade_id: {message: 'Please enter a trade', required: true, default: 'trade_1'}
                 }
             };
             prompt.message = '';
             prompt.start();
             prompt.get(schema, function (err, result) {
                 console.log("trade_id: ", result.trade_id)
                 trade_id = result.trade_id
                 resolve()
             });
         });
     }
 }

 function get_trade_current_version(trade_id, cv, data) {

     return function _get_trade_current_version() {

         return new Promise(function (resolve, reject) {

             Trades.get_trade_current_version([trade_id, {}])
                 .then(
                     function (args) {
                         cv = parseInt(args)
                         resolve()
                     })
         });
     }
 }


  function get_trade_versions(trade_id, cv, data) {

      return function _get_trade_versions() {

          return new Promise(function (resolve, reject) {

              var proms = [];
              for (var i = 1; i <= cv; i++) {
                  proms[i] = Trades.get_trade_version([trade_id, i, {}])
              }

              Promise.all(proms).then(function (args) {
                  data = args
                  resolve()
              })
          });
      }
  }

  function log_vars(trade_id, cv, data) {
      return function _log_vars() {
          console.log("trade_id:", trade_id);
          console.log("cv: ", cv);
          console.log("data: ", data)
      }
  }

  function display_table(trade_id, cv, data) {

      return function _display_table() {

          return new Promise(function (resolve, reject) {

              var Table = require('cli-table');

              // instantiate
              var table = new Table({
                  head: ['Instrument', 'Buyer', 'Seller', 'Amount', 'Bond Price', 'Settlement Date', 'version']
                  , colWidths: [20, 20, 20, 20, 20, 20, 20]
              });


              for (var i = 1; i <= cv; i++) {
                  table.push(data[i])
              }

              console.log(table.toString());

              resolve()
          });
      }
  }











function display_trade_detail(args){

    return new Promise(function(resolve,reject){

        console.log("instrument: \t", args[0]);
        console.log("buyer: \t\t", args[1]);
        console.log("seller: \t", args[2]);
        console.log("amount: \t", args[3].toString());
        console.log("bond_price: \t", args[4].toString());
        console.log("settlement_date: ", args[5].toString());
        console.log("version: \t", args[6].toString());

        resolve()
    });

}

function display_trade_table(args){

    return new Promise(function(resolve,reject){

        var Table = require('cli-table');

        // instantiate
        var table = new Table({
            head: ['Instrument', 'Buyer', 'Seller', 'Amount', 'Bond Price', 'Settlement Date', 'version']
            , colWidths: [20, 20,20,20,20,20,20]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        table.push(
            [args[0], args[1], args[2], args[3], args[4], args[5], args[6]]
        );

        console.log(table.toString());

        resolve()
    });
}


function get_args(){
    return new Promise(function (resolve,reject){
        var args = [{}];
        resolve(args);
    });
}

function set_args_proxy(){
    return new Promise(function(resolve,reject){
        var args = [{from:cb}];
        resolve(args)
    });
}


function set_args(){
    return new Promise(function(resolve,reject){
        var args = ["bond_2", "seller_2", 'buyer_2',{from:cb}];
        resolve(args)
    });
}


