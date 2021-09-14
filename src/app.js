const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suraj Monga'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Suraj Monga'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Suraj Monga'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ 'error': 'Please enter a address' })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ 'error': error })

        }

        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({ 'error': error })

            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })


    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found.',
        title: 'help 404',
        name: 'Suraj Monga'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'URL not found',
        title: '404',
        name: 'Suraj Monga'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})