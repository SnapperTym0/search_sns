var SNSInterface = require('./sns_interface');

var Twitter = function(request, exec) {
    var that = SNSInterface(request, exec);
    // OAuthリクエスト用URL
    that.bearerRequestURL = 'https://api.twitter.com/oauth2/token';
    // 認証用ファイル
    that.credentialFileName = '$CREDENTIAL';
    // 認証JSONファイル読み取り
    that.readCredential = function(callback) {
        that.exec(`cat ${that.credentialFileName}`, callback);
    }
    // アクセストークンを取得する
    that.getToken = function(callback) {
        that.readCredential((err, stdout)=>{
            if(err) return console.error(err);
            var credential = JSON.parse(stdout).Twitter;
            that.requestToken(credential.api_key, credential.api_secret, callback);
        });
    }
    // OAuth認証リクエスト
    that.requestToken = function(api_key, api_secret, callback) {
        // 認証用ヘッダ&ボディを作成し、POSTリクエストを送信
        that.request.post(that.bearerRequestURL, {
            form: {
                grant_type: 'client_credentials',
                client_id: api_key,
                client_secret: api_secret
            },
            // 結果をJSONで受け取る
            json: true 
        }, callback);
    }
    that.getImages = function(query, callback) {
        that.getToken((err, res, body)=>{
            if(err) return console.error(err);
            callback(JSON.stringify(body));
        });
    }
    return that;
}

exports = module.exports = Twitter;
