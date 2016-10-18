

var stringify = require('csv-stringify');


var data = [['head_1', 'head_2', 'head_3'], [11,12,13],[21,22,23],[31,32,33]]


stringify(data, function(err, output){
    console.log(output)
});

