var exec = require('cordova/exec');
module.exports = {
    run :  function(str,callback){
        exec(callback, (err) => {
            callback(err);
        }, "FacebookSdk", "login", [str]);
    }
}