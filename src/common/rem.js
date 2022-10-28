// !function(n){
//     var  e=n.document,
//          t=e.documentElement,
//          i=750,
//          d=i/100,
//          o="orientationchange"in n?"orientationchange":"resize",
//          a=function(){
//              var n=t.clientWidth||320;n>750&&(n=750);
//              t.style.fontSize=n/d+"px"
//          };
//          e.addEventListener&&(n.addEventListener(o,a,!1),e.addEventListener("DOMContentLoaded",a,!1))
// }(window);

window.onload = function() {
    getRem(750, 100)
};
window.onresize = function() {
    getRem(750, 100)
};

function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth / pwidth * prem + "px";
    //切换显示与否
    document.getElementById('app').style.display = '';
    var noapps = document.getElementById('noapps')
    if(noapps){
        noapps.style.display = 'none';
    }
}