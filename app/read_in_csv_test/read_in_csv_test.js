
// ******** imports ************

// var jsonfile = require("jsonfile");
// var Web3 = require('web3');
// var csv = require('csv')
// var fs = require('fs')
//
// // ************ set up web3 ***************
//
// const web3 = new Web3();
// var url = "http://192.168.99.100:8541";
// web3.setProvider(new web3.providers.HttpProvider(url));
//


var fs = require('fs');
var parse = require('csv-parse');
var Table = require('cli-table');

var parser = parse({delimiter: ','}, function(err, data){


    var start_col = 0;
    var end_col = 11;
    var num_cols = end_col - start_col;

    var col_widths = [];
    for (var i= 0;i<num_cols;i++){
        col_widths.push(20);
    }

    console.log(col_widths)

// instantiate
    var table = new Table({
        head: data[0].slice(start_col,end_col)
        , colWidths: col_widths
    });

    for (var i = 1; i<10; i++) {
        table.push(data[i].slice(start_col, end_col));
    }

    console.log(table.toString());

});

fs.createReadStream('./app/read_in_csv_test/csv_trades_source.csv').pipe(parser);
