const request = require('request')

const forecast = (latitude, longitude, callback) => {
    x = latitude + ',' + longitude
    const url = 'https://api.weatherapi.com/v1/current.json?key=f36220bf20c84f1eb6674343211209&q=' + encodeURIComponent(x)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {

            temp=response.body.current.temp_c
            chance=response.body.current.cloud
            callback(undefined, response.body.current.condition.text+" It is currently " + temp + " degrees out, And there is a chance of " + chance + " % rain.")
        }

    })

}


module.exports=forecast

