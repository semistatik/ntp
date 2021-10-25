// global var for holding the bookmarks
let bookmarks = [];

// page elements
const form = document.getElementById('bm-form');
const submitBtn = document.getElementById('bm-add');
const nameField = document.getElementById('bm-name');
const urlField = document.getElementById('bm-url');
const bmList = document.getElementById('bm-list');
const messageEle = document.getElementById("bm-message");

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
}

// create a bookmark object and return it
function createBookmark(bmName, bmUrl) {
    let newBM = {
        id: getLastBMId() + 1,
        name: bmName,
        url: bmUrl,
        dateCreated: Date.now()
    }

    return newBM;    
}

// build bookmark item element
function createBookmarkElement(bm){
    // bookmark container
    const bmElement = document.createElement('a');
    bmElement.classList.add("bm-item");
    bmElement.href = bm.url;

    // bookmark icon
    const bmIcon = document.createElement('div');
    bmIcon.classList.add("bm-icon");
    bmIcon.innerText = bm.name[0].toUpperCase();
    
    // bookmark text
    const bmText = document.createElement('div');
    bmText.classList.add("bm-text");
    bmText.textContent = bm.name;
    
    
    bmElement.appendChild(bmIcon);
    bmElement.appendChild(bmText);

    bmList.appendChild(bmElement);
};

// saves bookmark to global var
function pushBookmark(bookmark){
    bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    console.log("new bookmark: ", bookmark);

    // add bookmark to local var then save to localStorage
    bookmarks.push(bookmark);
    storeBookmarks();

}

// load bookmarks on document load
function loadBookmarks(){
    bookmarks = getBookmarks();

    for (let bm of bookmarks){
        createBookmarkElement(bm);
    }
}

// get bookmarks out of local storage
// return bookmarks object or empty array
function getBookmarks(){
    return localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
}

// saves bookmarks to storage
function storeBookmarks(){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// show a message
function showMessage(message){
    messageEle.textContent = message;
}

// gets the last id in the bookmarks
function getLastBMId(){
    return Math.max(...bookmarks.map(o => o.id), 0);
}

// greetings
function getGreeting(){
    let currentHour = new Date().getHours();
    let msg = "";
    if(currentHour >=0 && currentHour < 6){
        msg = "good early morning";
    } else if (currentHour >= 6 && currentHour < 12){
        msg = "good morning";
    } else if (currentHour >= 12 && currentHour < 18){
        msg = "good afternoon";
    } else{
        msg = "good evening";
    }

    return msg;
}

document.addEventListener('DOMContentLoaded', function(){
    
    loadBookmarks();

    // update greeting
    let message = document.getElementById('message');
    message.textContent = getGreeting();
});
