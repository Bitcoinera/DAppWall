const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
var querystring = require('querystring');

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/src');

app.get('/', (req, res) => {
    res.render('src/index.html');
})

app.get('/:hash/:id/:ip', (req, res) => {
    console.log(req.params.hash);
    let hash = req.params.hash;
    let id = req.params.id;
    let ip = req.params.ip;
    request(
        {
            headers: {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json'
            },
            uri: `http://swarm.protocol-bt.ml/bzz:/${hash}`,
            method: 'GET'
          }, function (error, response, body) {
            if (!error) {
                console.log(response.body);
                response.body = [];
                let newBody = {
                    id: id,
                    ip, ip
                }
                response.body.push(querystring.stringify(newBody));
                res.json(response.body);
            }
            else {
                console.log("An error occured");
            }
        })
})

app.post('/', (req, res) => {
    let id = req.body.id;
    let ip = req.body.ip;
    let form = {
        id: id,
        ip: ip
    };
    let formData = querystring.stringify(form);
    let hash;

    request(
    {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://swarm.protocol-bt.ml/bzz:/',
        body: formData,
        method: 'POST'
      }, function (error, response, body) {
        if (!error) {  
            hash = body;
            res.redirect(`/${hash}/${id}/${ip}`);
        }
        else {
            console.log("An error occured");
        }
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})