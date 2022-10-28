/**
 * 获取随机数
 * @param l
 * @param seed
 * @returns {string}
 */
module.exports.randomChar = function (l, seed) {
    var x = seed || "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM-"
    var tmp = ""
    for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return tmp
}