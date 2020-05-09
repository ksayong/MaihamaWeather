
//時刻によってbackground-colorを変化させる
$(function () {
    //朝、昼、夕、夜の時間判定処理
    var getH = new Date().getHours();
    if ((getH >= 5) && (getH < 10)) { $('.tgtCnt').removeClass('night').addClass('morning'); }
    else if ((getH >= 10) && (getH < 16)) { $('.tgtCnt').removeClass('morning').addClass('noon'); }
    else if ((getH >= 16) && (getH < 18)) { $('.tgtCnt').removeClass('noon').addClass('afternoon'); }
    else if ((getH >= 18) || (getH < 5)) { $('.tgtCnt').removeClass('afternoon').addClass('night'); }
});
