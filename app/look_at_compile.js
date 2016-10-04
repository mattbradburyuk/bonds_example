var jsonfile = require("jsonfile");

var json = jsonfile.readFileSync('../output/compiled/compiled.json')

console.log(json);