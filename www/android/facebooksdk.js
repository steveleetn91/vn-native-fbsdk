var exec = require('cordova/exec');
module.exports = {
    login: function (permission, successuccess, failail) {
        exec(successuccess, failail, "FacebookSdk", "login", permission);
    },
    getLoginStatus: function getLoginStatus(successuccess, failail) {
        exec(successuccess, failail, 'FacebookConnectPlugin', 'getLoginStatus', [])
    },
    showDialog: function showDialog(options, successuccess, failail) {
        exec(successuccess, failail, 'FacebookConnectPlugin', 'showDialog', [options])
    },
    checkHasCorrectPermissions: function (permission, successuccess, failail) {
        exec(successuccess, failail, 'FacebookConnectPlugin', 'checkHasCorrectPermissions', permission)
    },
    logEvent: function (name, params, valueToSum, success, fail) {
        // Prevent NSNulls getting into iOS, messes up our [command.argument count]
        if (!params && !valueToSum) {
            exec(success, fail, 'FacebookConnectPlugin', 'logEvent', [name])
        } else if (params && !valueToSum) {
            exec(success, fail, 'FacebookConnectPlugin', 'logEvent', [name, params])
        } else if (params && valueToSum) {
            exec(success, fail, 'FacebookConnectPlugin', 'logEvent', [name, params, valueToSum])
        } else {
            fail('Invalid arguments')
        }
    },
    logPurchase: function (value, currency, success, fail) {
        exec(success, fail, 'FacebookConnectPlugin', 'logPurchase', [value, currency])
    },
    getAccessToken: function (success, fail) {
        exec(success, fail, 'FacebookConnectPlugin', 'getAccessToken', [])
    },
    logout: function (success, fail) {
        exec(success, fail, 'FacebookConnectPlugin', 'logout', [])
    }, 
    api: function (graphPath, permissions, success, fail) {
        permissions = permissions || []
        exec(success, fail, 'FacebookConnectPlugin', 'graphApi', [graphPath, permissions])
    },
    getDeferredApplink: function(success, fail) {
        exec(success, fail, 'FacebookConnectPlugin', 'getDeferredApplink', [])
    },
    activateApp: function (success, fail) {
        exec(success, fail, 'FacebookConnectPlugin', 'activateApp', [])
    },
    getDeferredApplink: function (success, fail) {
        exec(success, fail, 'FacebookConnectPlugin', 'getDeferredApplink', [])
    }
}