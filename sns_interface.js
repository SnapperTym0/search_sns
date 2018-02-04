var SNSInterface = function(request, exec){
    var that = {};
    that.request = request;
    that.exec = exec;
    that.getImages = function(query, callback){
        throw 'This function is no implementarion';
    };
    that.getVideos = function(query, callback){
        throw 'This function is no implementarion';
    };
    that.getTexts =function(query, callback){
        throw 'This function is no implementarion';
    };

    return that;
}

exports = module.exports = SNSInterface;
