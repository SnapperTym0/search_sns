var SNSInterface = require('./sns_interface');
var Response = require('./response');

var Twitter = function(request, exec) {
    // インターフェースの実装 
    var that = SNSInterface(request, exec);
    // OAuthリクエスト用URL
    that.bearerRequestURL = 'https://api.twitter.com/oauth2/token';
    // Twitter SearchリクエストURL
    that.searchRequestURL = 'https://api.twitter.com/1.1/search/tweets.json?';

    /* 
     * 認証JSONファイル読み取り
     *
     * @param callback コールバック関数
     * @return callback(error, stdout, stderr)を実行する
     *         stdoutにはAPI認証情報の文字列が格納される
     */
    that.readCredential = function(callback) {
        that.exec(`cat ${that.credentialFileName}`, callback);
    }

    /* 
     * アクセストークンを取得する
     *
     * @param  callback コールバック関数
     * @return callback(error, response, body)を実行する
     */
    that.getToken = function(callback) {
        that.readCredential((err, stdout)=>{
            if(err) return console.error(err);
            var credential = JSON.parse(stdout).Twitter;
            that.requestToken(credential.api_key, credential.api_secret, callback);
        });
    }

    /* 
     * OAuth認証リクエストを送信する
     *
     * @param  api_key Twitter API_KEY
     * @param  api_secret Twitter API_SECRET
     * @param  callback コールバック関数
     * @return callback(error, response, body)を実行する
     */
    that.requestToken = function(api_key, api_secret, callback) {
        // 認証用ヘッダ&ボディを作成し、POSTリクエストを送信する
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

    /*
     * jsonデータから、画像・動画・テキスト情報を抽出する
     *
     * @param  jsons JSONデータのリスト
     * @param  type 'media', 'movie', 'text'のいずれかの文字列
     * @return 指定された情報を抽出したリストを返す
     */
    that.extraData = function(jsons, type) {

        //if(type === 'image') {}
        var response = Response();
        jsons.forEach((currentData)=>{
            const medias = currentData.entities.media;
            // undifinedならcontinueする
            if(!medias) return;
            medias.forEach((currentMedia)=>{
                response.setData(currentMedia.media_url);
            });
        });
        return response;
    }

    /*
     * TwitterSearchAPIへGETリクエストを送信する
     *
     * @param  token TwitterAPIアクセストークン
     * @param  callback コールバック関数
     * @return callback(error, response, body)を実行する
     */
    that.requestSearch = function(url, token, callback) {
        // アクセストークンの設定
        const auth = 'Bearer ' + token;
        that.request.get({
            url: url,
            headers: {Authorization: auth},
            json: true
        }, (err, response, body)=>{
            if(err) return console.error(err);
            const jsons = body.statuses;
            callback(jsons);
        });
    }

    /*
     * 検索URLを作成する
     *
     * @param  query 検索文字列
     * @param  type image or video or text を選択
     * @return 引数typeに応じた検索URL
     */
    that.setSearchQuery = function(query, type) {
        const filter = ' filter:images';
        const count = 100;
        if(!query){
            query = '';
        }
        query = query + filter;
        query = encodeURI(query);
        return that.searchRequestURL + `q=${query}&count=${count}&locale=ja&lang=ja`;
    }

    /* 
     * 画像付き投稿を検索して取得する
     *
     * @param  query 検索文字列
     * @param  callback コールバック関数
     * @param  access_token アクセストークン @nullable
     * @return callback(JSON)を実行する
     */
    that.getImages = function(query, callback, access_token) {
        const url = that.setSearchQuery(query);
        const token = access_token;

        if (token) {
            // access_tokenがある場合
            that.requestSearch(url, token, (json)=>{
                const responses = that.extraData(json, 'image');
                callback(responses);
            });
        } else {
            // access_tokenがない場合
            that.getToken((err, res, body)=>{
                if(err) return console.error(err);
                token = body.access_token;
                that.requestSearch(url, token, (json)=>{
                    const responses = that.extraData(json, 'image');
                    callback(responses);
                });
            });
        }
    }
    return that;
}

exports = module.exports = Twitter;
