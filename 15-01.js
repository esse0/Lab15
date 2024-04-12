const express = require('express')
const expressHandlebars = require('express-handlebars');
const app = express()
const fs = require('fs');

const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs',
    partialsDir: './views/partials',
    helpers:{
        backButton: function () {
            return '<input type="button" class="btn btn-danger" value="Отказаться" onclick="back()"/>';
        }
    }
});

function getJsonFromFile(){
    let data = fs.readFileSync('./directory.json');
    return JSON.parse(data);
}

function writeJsonToFile(JSON){
    fs.writeFileSync("./directory.json", JSON);
}

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use('/static', express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
    let list = getJsonFromFile();
    res.render('get', {list: list})
})

app.get('/Add', (req, res) => {
    let list = getJsonFromFile();
    res.render('add', {list: list})
})

app.get('/Update', (req, res) => {
    let id = req.query.id;
    let list = getJsonFromFile();
    let element = list.find(i => i.id == id);
    
    res.render('update', {list: list, element: element})
})

app.post('/Add', (req, res) => {
    let list = getJsonFromFile();
    let newId = 0;

    if(list.length >= 1) newId = list.slice(-1)[0].id + 1;

    list.push({id: newId, fullName: req.body.fullName.trim(), phoneNumber: req.body.phoneNumber.trim()});
    writeJsonToFile(JSON.stringify(list));

    res.redirect('/');
})

app.post('/Delete', (req, res) => {
    let list = getJsonFromFile();
    let delIndex = list.findIndex(i => i.id === +req.body.Id);

    if(delIndex != -1){
        list.splice(delIndex, 1);
    }

    writeJsonToFile(JSON.stringify(list));

    res.redirect('/');
})

app.post('/Update', (req, res) => {
    let list = getJsonFromFile();
    let updIndex = list.findIndex(i => i.id === +req.body.id);
    
    if(updIndex != -1){
        list[updIndex].fullName = req.body.fullName.trim();
        list[updIndex].phoneNumber = req.body.phoneNumber.trim();
    }

    writeJsonToFile(JSON.stringify(list));
    res.redirect('/');
})
  
app.listen(3000)