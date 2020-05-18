jQuery(function ($) {
    //時刻によってbackground-colorを変化させる
    $(function () {
        //朝、昼、夕、夜の時間判定処理
        var getH = new Date().getHours();
        if ((getH >= 5) && (getH < 10)) { $('.sky-color').removeClass('night').addClass('morning'); }
        else if ((getH >= 10) && (getH < 16)) { $('.sky-color').removeClass('morning').addClass('noon'); }
        else if ((getH >= 16) && (getH < 18)) { $('.sky-color').removeClass('noon').addClass('afternoon'); }
        else if ((getH >= 18) || (getH < 5)) { $('.sky-color').removeClass('afternoon').addClass('night'); }
    });
});
