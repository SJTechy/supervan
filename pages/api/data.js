import data from './data.json'
const fs = require('fs')

export default function (req, res) {
    if (req.method === 'GET') {
        res.status(200).json(data)
    }
    if (req.method === 'PATCH') {
        fs.writeFile('/Users/macbookpro/Desktop/Coding/Side Projects/supervan/pages/api/data.json', req.body, (err, data) => {
            if (err) {
                res.status(400).json({message: err})
                return
            }
            res.status(200).json(req.body)
        })

    }
}