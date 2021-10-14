

// page elements
const form = document.getElementById('bm-form');
const submitBtn = document.getElementById('bm-add');
const nameField = document.getElementById('bm-name');
const urlField = document.getElementById('bm-url');
const messageEle = document.getElementById("bm-message");

const bmList = document.getElementById('bookmarks');

// form watcher
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // get the values
    var name = nameField.value;
    var url = urlField.value;
    
    // pass values to builder
    if (name && url){
        messageEle.textContent = "";
        createBookmark(name, url);
    } else {
        showMessage("name and url are required");
    }

    //clear fields
    nameField.value = "";
    urlField.value = "";
    
    // focus on name field
    nameField.focus();

});

// build bookmark element
function createBookmark(name, url){
    const bmElement = document.createElement('li');
    bmElement.innerHTML = `<a href="${url}">${name}</a>`;

    bmList.appendChild(bmElement);
};

// show a message
function showMessage(message){
    messageEle.textContent = message;
}