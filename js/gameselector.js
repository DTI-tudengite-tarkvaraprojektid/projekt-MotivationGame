/*
var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

window.onload=loadFile();

function loadFile() {
    //reader.open('get', 'general.json', true); 
    reader = document.getElementById("json-file");
    reader.onreadystatechange = displayContents;
    reader.send(null);
    console.log("Loaded json in.");
    displayContents();
}

function displayContents() {
    if(reader.readyState==4) {
        var el = document.getElementById('main');
        el.innerHTML = reader.responseText;
        console.log("Displaying all json files.");
    }
}

function createStoryBoxes(){
    var element = document.createElement("div");
    var para = document.createTextNode('The man who mistook his wife for a hat');
    element.appendChild(para);
    document.getElementsByTagName('body')[0].appendChild(element);
}

*/
function uploadJSON(){
    let json = document.getElementById("json-file").files[0];
    let req = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("json", json);
    req.open("POST", "/JSONFiles/");
    req.send(formData);
    console.log("Uploaded json file.", json);
}
/*
// Key for local storage, use to save and access.
var FILE_KEY = 'save.json';

// fire processUpload when the user uploads a file.
document.querySelector('#json-file').addEventListener('change', handleFileUpload, false);

// Log any previously saved file.
console.log('previous save: ', retrieveSave());

// Setup file reading
var reader = new FileReader();
reader.onload = handleFileRead;

function handleFileUpload(event) {
    var file = event.target.files[0];
    reader.readAsText(file); // fires onload when done.
}

function handleFileRead(event) {
    var save = JSON.parse(event.target.result);
    console.log(save) // {hp: 32, maxHp: 50, mp: 11, maxMp: 23}
    window.localStorage.setItem(FILE_KEY, JSON.stringify(save));
}

function retrieveSave() {
    return JSON.parse(localStorage.getItem(FILE_KEY))
}
*/