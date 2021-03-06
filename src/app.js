const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port= process.env.PORT || 3000

// Define paths for Express Configuration
const htmlpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../template/views')
const partialspath = path.join(__dirname,'../template/partials')

// Setup handlebars engine
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(htmlpath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Shri Ram Rawat'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Shri Ram Rawat'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help!',
        name:'Shri Ram Rawat',
        message:"What can i help you ?"
    })
})

app.get('/weather',(req, res)=>{
    address = req.query.address
    if (!address){
        return res.send({
           Error: 'Please provide an address'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
    
    if (error){
        return res.send({ error })
    }
    forecast(latitude,longitude ,(error,data)=>{
    
        if (error){  
            return res.send({ error })
        }
        res.send({
            data,
            location,
            address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shri Ram Rawat',
        errormessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shri Ram Rawat',
        errormessage:'Page not found.'
    })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
}) 