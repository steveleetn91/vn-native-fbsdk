var exec = require('cordova/exec');
module.exports = {
    login : function(permission,success,fail) {
        exec(success,fail, (err) => {
            fail(err);
        }, "FacebookSdk", "login", permission);
    }
}