
module.exports = {
    setup : function(appId){
        window.fbAsyncInit = function () {
            FB.init({
                appId: appId,
                cookie: true,
                xfbml: true,
                version: 'v7.0'
            });
        
            FB.AppEvents.logPageView();
        
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                return resolve(true);
            },3000);
        });
    },
    connect : function(){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                return resolve(FB);
            },1000);
        });
    }
};