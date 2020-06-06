
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
module.exports = {
    setup : function(appId,apiVersion){
        window.fbAsyncInit = function () {
            FB.init({
                appId: appId,
                cookie: true,
                xfbml: true,
                version: apiVersion
            });
        
            FB.AppEvents.logPageView();
        
        };
    },
    connect : function(){
        setTimeout(() => {
            if(FB) {
                return new Promise((resolve,reject) => {
                    resolve(FB);
                });
            } else {
                this.connect();
            }
        },1000);
    }
};