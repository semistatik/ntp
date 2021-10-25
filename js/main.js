// page elements
const form = document.getElementById('bm-form');
const submitBtn = document.getElementById('bm-add');
const nameField = document.getElementById('bm-name');
const urlField = document.getElementById('bm-url');
const messageEle = document.getElementById("bm-message");

const bmList = document.getElementById('bm-list');

// form watcher
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // get the values
    var name = nameField.value;
    var url = urlField.value;
    
    // pass values to builder
    if (name && url){
        messageEle.textContent = "";
        processBookmark(name, url);
    } else {
        showMessage("name and url are required");
    }

    //clear fields
    nameField.value = "";
    urlField.value = "";
    
    // focus on name field
    nameField.focus();

});

// process the input
function processBookmark(name, url){
    let newBM = createBookmark(name, url);
    createBookmarkElement(newBM);
    pushBookmark(newBM);
    showMessage("bookmark added");
    //updateBMHeading();
}

// create a bookmark object and return it
function createBookmark(bmName, bmUrl) {
    
    let newBM = {
        id: 1,
        name: bmName,
        url: bmUrl,
        dateCreated: Date.now()
    }

    return newBM;    
}

// build bookmark item element
function createBookmarkElement(bm){
    const bmElement = document.createElement('a');
    bmElement.classList.add("bm-item");
    bmElement.href = bm.url;

    const bmIcon = document.createElement('div');
    bmIcon.classList.add("bm-icon");
    bmIcon.innerText = bm.name[0].toUpperCase();

    bmElement.appendChild(bmIcon);

    const bmText = document.createElement('div');
    bmText.classList.add("bm-text");
    bmText.textContent = bm.name;


    bmElement.appendChild(bmText);

    bmList.appendChild(bmElement);
};

// saves bookmark to localStorage
function pushBookmark(bookmark){
    let bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    console.log("bookmarks: ", bookmarks);
    console.log("new bookmark: ", bookmark);

    // add bookmark to local var then save to localStorage
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    console.log(localStorage);
}

// load bookmarks on document load
function loadBookmarks(){
    let bookmarks = getBookmarks();

    for(let i = 0; i < bookmarks.length; i++){
        console.log(bookmarks[i]);
        createBookmarkElement(bookmarks[i]);
    }

    //updateBMHeading();
}

// get bookmarks out of local storage
// return bookmarks object or empty array
function getBookmarks(){
    return localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
}

// show a message
function showMessage(message){
    messageEle.textContent = message;
}

function updateBMHeading(){
    let length = getBookmarks().length;
    let bmHeading = document.getElementById('bm-heading');
    bmHeading.innerText = `There ${length == 1 ? "is" : "are" } ${length} bookmark${length == 1 ? "" : "s" } saved`;
}

document.onload = loadBookmarks();
