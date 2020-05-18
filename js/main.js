//時刻によってbackground-colorを変化させる
$(function () {
    //朝、昼、夕、夜の時間判定処理
    var getH = new Date().getHours();
    if ((getH >= 5) && (getH < 10)) { $('.sky-color').removeClass('night').addClass('morning'); }
    else if ((getH >= 10) && (getH < 16)) { $('.sky-color').removeClass('morning').addClass('noon'); }
    else if ((getH >= 16) && (getH < 18)) { $('.sky-color').removeClass('noon').addClass('afternoon'); }
    else if ((getH >= 18) || (getH < 5)) { $('.sky-color').removeClass('afternoon').addClass('night'); }
});

var app = new Vue({
    el: '#app',
    data: {
        city: null,
        temp: null,
        condition: {
            main: null
        }
    },
    mounted: function () {
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=Urayasu,jp&units=metric&appid=b60a9e35aacf10a739593a8245b04046')
            .then(function (response) {
                this.city = response.data.name
                this.temp = response.data.main.temp
                this.condition = response.data.weather[0]
            }.bind(this))
            .catch(function (error) {
                console.log(error)
            })
    },
    filters: {
        roundUp(value) {
            return Math.ceil(value)
        }
    }
})