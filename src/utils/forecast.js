const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bf8714f355c2f58ac2d9613b8102a05c/' + latitude + ',' + longitude;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary +
                'It is currently ' + body.currently.temperature +
                ' degrees out. There is a '+ body.currently.precipProbability
                +'% of precipitation');
        }
    });
}

module.exports = forecast;