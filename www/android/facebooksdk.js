var exec = require('cordova/exec');
module.exports = {
    login: function (permission, successuccess, failail) {
        exec(successuccess, failail, "VnNativeFacebookSdk", "login", permission);
    },
    getLoginStatus: function getLoginStatus(successuccess, failail) {
        exec(successuccess, failail, 'VnNativeFacebookSdk', 'getLoginStatus', [])
    },
    showDialog: function showDialog(options, successuccess, failail) {
        exec(successuccess, failail, 'VnNativeFacebookSdk', 'showDialog', [options])
    },
    checkHasCorrectPermissions: function (permission, successuccess, failail) {
        exec(successuccess, failail, 'VnNativeFacebookSdk', 'checkHasCorrectPermissions', permission)
    },
    logEvent: function (name, params, valueToSum, success, fail) {
        // Prevent NSNulls getting into iOS, messes up our [command.argument count]
        if (!params && !valueToSum) {
            exec(success, fail, 'VnNativeFacebookSdk', 'logEvent', [name])
        } else if (params && !valueToSum) {
            exec(success, fail, 'VnNativeFacebookSdk', 'logEvent', [name, params])
        } else if (params && valueToSum) {
            exec(success, fail, 'VnNativeFacebookSdk', 'logEvent', [name, params, valueToSum])
        } else {
            fail('Invalid arguments')
        }
    },
    logPurchase: function (value, currency, success, fail) {
        exec(success, fail, 'VnNativeFacebookSdk', 'logPurchase', [value, currency])
    },
    getAccessToken: function (success, fail) {
        exec(success, fail, 'VnNativeFacebookSdk', 'getAccessToken', [])
    },
    logout: function (success, fail) {
        exec(success, fail, 'VnNativeFacebookSdk', 'logout', [])
    }, 
    api: function (graphPath, permissions, success, fail) {
        permissions = permissions || []
        exec(success, fail, 'VnNativeFacebookSdk', 'graphApi', [graphPath, permissions])
    },
    getDeferredApplink: function(success, fail) {
        exec(success, fail, 'VnNativeFacebookSdk', 'getDeferredApplink', [])
    },
    activateApp: function (success, fail) {
        exec(success, fail, 'VnNativeFacebookSdk', 'activateApp', [])
    },
    getDeferredApplink: function (success, fail) {
        exec(success, fail, 'VnNativeFacebookSdk', 'getDeferredApplink', [])
    }
}