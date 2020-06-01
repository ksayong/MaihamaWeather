<template>
  <div class="sky-color">
    <div class="wrapper">
      <section class="OperatingHours">
        <div class="mainTitle">
          <h1>本日のパーク運営時間</h1>
        </div>
        <div class="park_title">
          <div class="tdl">
            <img src="@/assets/image/tdl_icon.png" alt="Tdl" class="park_icon">
            <h1>Tokyo<br>Disney Land</h1>
            <p class="tdl_ja_title">東京ディズニーランド</p>
            <p class="tdl_hours">〇〇：〇〇 - 〇〇：〇〇</p>
          </div>
          <div class="tds">
            <img src="@/assets/image/tds_icon.png" alt="Tds" class="park_icon">
            <h1>Tokyo<br>Disney Sea</h1>
            <p class="tds_ja_title">東京ディズニーシー</p>
            <p class="tds_hours">〇〇：〇〇 - 〇〇：〇〇</p>
          </div>
        </div>
      </section>
      <section class="weather_section">
        <div class="main-title">
          <h1>舞浜の天気</h1>
        </div>
        <div class="day_weather">
          <div class="temperature">
            <p>{{ temp | roundUp }}<span>℃</span></p>
          </div>
          <div class="weather_caption" v-cloak>
            <p v-if="condition.main == 'Rain'"><img src="@/assets/image/rain.png" alt="Rainy" class="weather_png"></p>
            <p v-else-if="condition.main == 'Clouds'"><img src="@/assets/image/cloudy.png" alt="Cloudy" class="weather_png"></p>
            <p v-else-if="condition.main == 'Clear'"><img src="@/assets/image/sunny.png" alt="Sunny" class="weather_png"></p>
            <p v-else><img src="@/assets/image/sunny.png" alt="Sunset" class="weather_png"></p>
          </div>
          <div class="weather_info">
            <p>
              <img src="@/assets/image/Wind.png" alt="" class="weather_info_icon">
              <span>風量 {{ wind }} m</span>
            </p>
            <p>
              <img src="@/assets/image/sunset.png" alt="" class="weather_info_icon">
              <span>日没 {{ sunsetHours }}:{{ sunsetMinutes }}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'Weather',
  data () {
    return {
      wind: null,
      temp: null,
      sunset: null,
      sunsetHours: null,
      sunsetMinutes: null,
      condition: {
        main: null
      }
    }
  },
  mounted: function () {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Urayasu,jp&units=metric&appid=' + process.env.VUE_APP_WEATHER_API_KEY
    axios.get(url)
      .then(function (response) {
        this.wind = response.data.wind.speed
        this.temp = response.data.main.temp
        const sunsetTime = response.data.sys.sunset
        this.condition = response.data.weather[0]
        this.sunset = new Date(sunsetTime * 1000)
        this.sunsetHours = this.sunset.getHours()
        this.sunsetMinutes = this.sunset.getMinutes()
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
    this.changeBgcolorDependOnTime()
  },
  filters: {
    roundUp (value) {
      return Math.ceil(value)
    }
  },
  methods: {
    // 時刻によってbackground-colorを変化させる
    changeBgcolorDependOnTime () {
      // 朝、昼、夕、夜の時間判定処理
      var getH = new Date().getHours()
      if ((getH >= 5) && (getH < 10)) {
        $('.sky-color').removeClass('night').addClass('morning')
      } else if ((getH >= 10) && (getH < 16)) {
        $('.sky-color').removeClass('morning').addClass('noon')
      } else if ((getH >= 16) && (getH < 18)) {
        $('.sky-color').removeClass('noon').addClass('afternoon')
      } else if ((getH >= 18) || (getH < 5)) {
        $('.sky-color').removeClass('afternoon').addClass('night')
      }
    }
  }
}
</script>

<style scoped>
</style>
