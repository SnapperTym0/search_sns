/*
 * クライアントへ返すレスポンスオブジェクト定義
 * 
 * @param  data クライアントへ返すデータ
 * @return この関数自身
 */
function Response() {
    var that = {};

    that.datas = [];

    that.setData = function(data) {
        that.datas.push(data);
    }

    that.stringify = function(data) {
        return JSON.stringify(that);
    }

    return that;
}

exports = module.exports = Response;
