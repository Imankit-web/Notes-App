let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let notesContainer = document.getElementById("notes-container");
let createBtn = document.querySelector("#create-btn");
let noteTitleI = document.getElementById("note-titleI");
let noteContentI = document.getElementById("note-contentI");
let msg = document.querySelector(".msg")


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
    let title = noteTitleI.value;
    let content = noteContentI.value;

    if (title.trim() !== "" && content.trim() !== "") {

        // 🔥 Create new note
        let note = document.createElement("div");
        note.classList.add("notes-output");

        note.innerHTML = `
            <h1 class="notes-titleO">${title}</h1>
            <p class="notes-paraO">${content}</p>
        `;

        // 🔥 Append to container
        document.getElementById("notes-list").appendChild(note);

        // Clear input
        noteTitleI.value = "";
        noteContentI.value = "";

        //hide msg container 
        msg.classList.add("hidden");
    }
}
createBtn.addEventListener("click" , notestext);





//keyboard Enter button input

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (document.activeElement === searchInput) {
            searchtext();
        } else if (
            document.activeElement === noteTitleI || 
            document.activeElement === noteContentI
        ) {
            notestext();
        }
    }
});