

// page elements
const form = document.getElementById('bm-form');
const submitBtn = document.getElementById('bm-add');
const nameField = document.getElementById('bm-name');
const urlField = document.getElementById('bm-url');

const bmList = document.getElementById('bookmarks');

// form watcher
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // get the values
    var name = nameField.value;
    var url = urlField.value;
    
    console.log(`name: ${name}, url: ${url}`);

    // pass values to builder
    build(name, url);

    //clear fields
    nameField.value = "";
    urlField.value = "";
    
    // focus on name field
    nameField.focus();

});

// build bookmark element
const build = (name, url) => {
    const bmElement = document.createElement('li');
    bmElement.innerHTML = `<a href="${url}">${name}</a>`;

    bmList.appendChild(bmElement);
}