
module.exports = {
    setup : function(appId){
        return new Promise((resolve,reject) => {
            return resolve(false);
        });
    },
    connect : function(){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                return resolve(false);
            },1000);
        });
    }
};