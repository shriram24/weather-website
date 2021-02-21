const request = require('postman-request')

const forecast = (lat , log , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6d652b7813cec4c4388a539061242c54&query='+encodeURIComponent(lat)+','+encodeURIComponent(log)+'&units=f'
    request({ url , json: true},(error,{body}={})=>{
        if (error){
            callback('Unable to coonect to weather service!',undefined)
        }else if (body.error){
            callback('Unable to find location!',undefined)
        }else {
            callback(undefined ,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree out.It feels liks '+body.current.feelslike+' degree out')
        }
    })
}

module.exports = forecast