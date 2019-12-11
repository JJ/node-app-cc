const fs = require("fs");
folder = fs.mkdtempSync( "foo-" );
for (var i in [1,2]) {
  fs.mkdirSync( folder + "/" + i);
}

console.log( fs.readdirSync( folder ));
