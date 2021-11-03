const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const app = express()

const url = 'https://www.homekoncept.com.pl/product-category/dom/wszystkie-projekty-domow/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const names = []


        $('.type-product', html).each(function() {
            const title = $(this).find('h3').text()
            const price = $(this).find('.product-price').text()
            const newPrice = price.match(/\d+/g).toString()
            names.push({
                title,
                newPrice
            })
        })
        console.log(names)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))