var SNSInterface = function(request, exec){
    var that = {};
    // requestモジュール
    that.request = request;
    // execモジュール
    that.exec = exec;
    // 認証用ファイル
    that.credentialFileName = '$CREDENTIAL';
    // 画像URLリストを返す
    that.getImages = function(query, callback){
        throw 'This function is no implementarion';
    };
    // 動画URLリストを返す
    that.getVideos = function(query, callback){
        throw 'This function is no implementarion';
    };
    // テキストURLリストを返す
    that.getTexts =function(query, callback){
        throw 'This function is no implementarion';
    };

    return that;
}

exports = module.exports = SNSInterface;
