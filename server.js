const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const shell = require('shelljs');

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/src');

app.get('/', (req, res) => {
    res.render('src/index.html');
})

app.post('/', (req, res) => {
    let IPList = req.body;
    IPList = IPList.map( ip => ip.ip + ' ; ' + ip.label);
    console.log(IPList);

    // create iptables for DAppWall. Right now all ips are treated as malicious and banned.
    let iptablesContent = `#!/bin/sh\n### first flush all the iptables Rules\niptables -F\n\n`;
    for ( let i = 0; i < IPList.length; i++ ) {
        iptablesContent = iptablesContent + `iptables -A INPUT -s ${IPList[i]} -j DROP\n`
    }

    // fs.writeFile('ips_list', JSON.stringify(IPList), (data) => {})
    fs.writeFile('dappwall_iptables.sh', iptablesContent, (data) => {});
    // fs.chmodSync('./trial.sh', '755');
    fs.chmodSync('./dappwall_iptables.sh', '755');
    shell.exec('./trial.sh');
    res.end();
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})