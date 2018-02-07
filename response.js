/*
 * クライアントへ返すレスポンスオブジェクト定義
 * 
 * @param  data クライアントへ返すデータ
 * @return この関数自身
 */
function Response(data) {
    var that = {};

    that.data = data;

    return that;
}

exports = module.exports = Response;
