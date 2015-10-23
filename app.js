var fs = require('fs');
var Hashes = require('jshashes');
//arrays for the hashes that we will generate(static and dynamic)
var hash_orig = new Array();
var hash_new = new Array();

//array of paths of all the files of our directory
var path_elements = [];
//saving path of the directory that we want to check
var path = process.argv[2];
//array of hashes
var SHA1 = [];
//If the user run the application incorrectly a help message will appear
if (process.argv.length <= 2) {
    console.log("Usage: node " + __filename + " path/to/directory that we want to check");
    process.exit(-1);
}

//Function that parse the directory we want to check and hashes
    //the absolute path of each files and save it to a static array that
    //we will use to compare with the dynamic one
fs.readdir(path, function(err, items) {
    console.log('\nNumber of files in the directory: '+items.length);
    console.log('Hashing algorithm: SHA1')
    for (var i=0; i<items.length; i++) {
        path_elements.push(path+"/"+items[i])
        var SHA1 = new Hashes.SHA1().b64(path_elements[i])
        console.log([i+1]+':\t'+items[i]+"\t" + SHA1)
        hash_orig.push(SHA1);
    }
});
//Function that parse the directory we want to check and hashes each 4 seconds
    //the absolute path of each files and save it to a dynamic array that
    //we will use to compare with the static(original) one
setInterval(function(){
    fs.readdir(path, function(err, items) {
        path_elements = [];
        for (var i=0; i<items.length; i++) {
            path_elements.push(path+"/"+items[i])
            var SHA1 = new Hashes.SHA1().b64(path_elements[i])
            hash_new.push(SHA1);
        }
        arraysIdentical(hash_orig,hash_new);
        hash_new = [];
    });
},4000);

//Function that compare the value of 2 arrays with original hashes(static) and
    //with the new hashes(dynamic). It also outputs the original hash with the new one
function arraysIdentical(a, b) {
    var i = a.length;
    while (i--) {
        if (a[i] !== b[i]) {
            console.log('Files with changed path:  '+a[i]+'  ->  '+b[i]);
        }
        else {
            console.log('File: '+i+' No changes detected!');
        }
    }
    console.log('\n');
    return true;
};














