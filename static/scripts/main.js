function add(name, number) {
    console.log('POST: /ADD')

    if(name.split(' ').join('') == '' || number.split(' ').join('') == '') return;

    fetch('/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullName: name, phoneNumber: number })
    })
    .then(raw => raw.text())
    .then(() => {
        window.location.assign(`/`);
    })
    .catch(err => {
        console.log(err);
    });
}

function _delete() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has('id')){
        const id = urlParams.get('id');
        
        if(id < 0) return;

        console.log("POST: /DELETE(Id=" + id + ")");

        fetch('/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Id: id })
        })
        .then(raw => raw.text())
        .then(text => {
            window.location.assign(`/`);
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}

function update (name, number) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(name.split(' ').join('') == '' || number.split(' ').join('') == '') return;

    if(urlParams.has('id')){
        const id = urlParams.get('id');
        console.log("POST: /UPDATE(Id=" + id + ")")

        fetch('/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, fullName: name, phoneNumber: number })
        })
        .then(raw => raw.text())
        .then(text => {
            window.location.assign(`/`);
        })
        .catch(err => {
            console.log(err);
        });
    }
}

function back() {
    window.location.assign(`/`);
}


let addBtn = document.getElementById('addBtn');

let nameField2 = document.getElementById('name_field')
let numberField2 = document.getElementById('number_field');

let deleteBtn = document.getElementById('deleteBtn');
let chngBtn = document.getElementById('chngBtn');
let nameField = document.getElementById('name_field_update');
let numberField = document.getElementById('number_field_update');

if(nameField != null){
    let name = nameField.value;
    let number = numberField.value;

    nameField.oninput = () =>{
        if(nameField.value != name || numberField.value != number){
            deleteBtn.setAttribute('disabled', '');
        }
        else{
            deleteBtn.removeAttribute('disabled');
        }

        if(nameField.value.length == 0 || numberField.value.length < 7 ){
            chngBtn.setAttribute('disabled', '');
        }
        else{
            chngBtn.removeAttribute('disabled');
        }
    }

    numberField.oninput = () =>{
        if(nameField.value != name || numberField.value != number){
            deleteBtn.setAttribute('disabled', '');
        }
        else{
            deleteBtn.removeAttribute('disabled');
        }
    
        if(numberField.value.length < 7 || nameField.value.length == 0){
            chngBtn.setAttribute('disabled', '');
        }
        else{
            chngBtn.removeAttribute('disabled');
        }
    }
}

if(numberField2 != null){
    addBtn.setAttribute('disabled', '');
    
    nameField2.oninput = () =>{
        if(nameField2.value.length == 0 || numberField2.value.length < 7){
            addBtn.setAttribute('disabled', '');
        }
        else{
            addBtn.removeAttribute('disabled');
        }
    }

    numberField2.oninput = () => {
        if(numberField2.value.length < 7 || nameField2.value.length == 0){
            addBtn.setAttribute('disabled', '');
        }
        else{
            addBtn.removeAttribute('disabled');
        }
    }
}