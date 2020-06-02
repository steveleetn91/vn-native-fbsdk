var exec = require('cordova/exec');
module.exports = {
    login : function(permission,success,fail) {
        exec(success,fail, (err) => {
            callback(err);
        }, "FacebookSdk", "login", permission);
    }
}