const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app= express()
const port=process.env.PORT || 3000

const publicDirpath=path.join(__dirname,'../public')
const viewpaths=path.join(__dirname,'../templates/views')
const partialpaths=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpaths)
hbs.registerPartials(partialpaths)

app.use(express.static(publicDirpath))
app.get('',(req, res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'Shruti Sharma'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'about me',
        name: 'shruti'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'shruti',
        helpText:'There is some useful text'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
           error: 'address needs to be provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => 
    {
        if(error){ return res.send({error})}
        forecast(latitude, longitude,(error, forecastData)=>{
            if (error) {
            return res.send({error})
            }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })

        })
    })
})


    // res.send({
    //     forcast:'clear weather',
    //     location:'chennai',
    //     address:req.query.address
    // })


app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 help',
        name:'Shruti Sharma',
        errorMessage: 'help article do not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        name: 'Shruti Sharma',
        title:'404',
        errorMessage:'page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up and running on port' +port)
})