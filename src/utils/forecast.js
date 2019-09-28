const request= require('request')
const forecast=(latitude,longitude, callback)=>{
    const url='https://api.darksky.net/forecast/ed7a38f732ac4dba3f0f32dce071039c/'+longitude+','+ latitude+'?units=si'
    request({ url, json:true},(error,{body})=>
    {
        if(error){
                callback('Unable to connect to weather app!',undefined)
        }
        else if (body.error) {
            callback('unable to find location.Please try again',undefined)
        }
        else{
            callback(undefined,{
                temperature:body.currently.temperature,
                summary:body.daily.data[0].summary,
                precipProbability:body.currently.precipProbability
            })
        }
    })
}
module.exports=forecast