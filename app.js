let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let notesContainer = document.getElementById("notes-container");
let createBtn = document.querySelector("#create-btn");
let noteTitle = document.getElementById("note-title");
let noteContent = document.getElementById("note-content");


// Search box text function
function searchtext(){
    let inputtext = searchInput.value; 
    if(inputtext != ""){
        console.log(inputtext);
        searchInput.value = "";
    };
} 

searchBtn.addEventListener("click", searchtext);



notesContainer.addEventListener("click", () => {
    notesContainer.classList.add("active");
});

document.addEventListener("click", (e) => {
    if (!notesContainer.contains(e.target)) {
        notesContainer.classList.remove("active");
    }
});

//logic for create button to work


function notestext() {
    let title = noteTitle.value;
    let content = noteContent.value;

    if (title.trim() !== "" && content.trim() !== "") {
        console.log(title,"\n",content);

        noteTitle.value = "";
        noteContent.value = "";
    }
}

createBtn.addEventListener("click" , notestext);

//create notes 
  





//enter button press logic

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchtext();
        notestext();
    };
});