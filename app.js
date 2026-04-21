let searchbtn = document.querySelector("#search-btn");
let searchinput = document.querySelector("#search-input");

// Search box text function
function searchtext(){
    let inputtext = searchinput.value; 
    if(inputtext != ""){
        console.log(inputtext);
        searchinput.value = "";
    };
} 
searchbtn.addEventListener("click", searchtext());

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchtext();
    };
});


let notesContainer = document.getElementById("notes-container");

notesContainer.addEventListener("click", () => {
    notesContainer.classList.add("active");
});

document.addEventListener("click", (e) => {
    if (!notesContainer.contains(e.target)) {
        notesContainer.classList.remove("active");
    }
});