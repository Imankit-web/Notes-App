let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let notesContainer = document.getElementById("notes-container");
let createBtn = document.querySelector("#create-btn");
let noteTitleI = document.getElementById("note-titleI");
let noteContentI = document.getElementById("note-contentI");
let msg = document.querySelector(".msg");
let notesList = document.getElementById("notes-list");

//-------------------store notes--------------------

let notes = JSON.parse(localStorage.getItem("notes")) || [];


// -------------------- SAVE --------------------

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}


// -------------------- RENDER --------------------

function renderNotes() {
    notesList.innerHTML = "";

    if (notes.length === 0) {
        msg.classList.remove("hidden");
        return;
    } else {
        msg.classList.add("hidden");
    }

    notes.forEach((noteData, index) => {
        let note = document.createElement("div");
        note.classList.add("notes-output");

        note.innerHTML = `
            <h1 class="notes-titleO">${noteData.title}</h1>
            <p class="notes-paraO">${noteData.content}</p>

            <button class="edit-btn">✏️</button>
            <button class="del-btn">
                <i class="fa-solid fa-delete-left"></i>
            </button>
        `;

        notesList.appendChild(note);

        // DELETE
        
        note.querySelector(".del-btn").addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        // EDIT

        note.querySelector(".edit-btn").addEventListener("click", () => {
            noteTitleI.value = noteData.title;
            noteContentI.value = noteData.content;

            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });
    });
}


// -------------------- CREATE NOTE --------------------

function notestext() {
    let title = noteTitleI.value.trim();
    let content = noteContentI.value.trim();

    if (title === "" && content === "") return;

    notes.push({ title, content });

    saveNotes();
    renderNotes();

    noteTitleI.value = "";
    noteContentI.value = "";
}

createBtn.addEventListener("click", notestext);


// -------------------- SEARCH --------------------

function searchtext() {
    let inputtext = searchInput.value.toLowerCase();
    let allNotes = document.querySelectorAll(".notes-output");

    if (inputtext === "") {
        allNotes.forEach(note => {
            note.classList.remove("hidden");
            resetHighlight(note);
        });
        return;
    }

    allNotes.forEach(note => {
        let titleEl = note.querySelector(".notes-titleO");
        let contentEl = note.querySelector(".notes-paraO");

        let title = titleEl.textContent.toLowerCase();
        let content = contentEl.textContent.toLowerCase();

        if (title.includes(inputtext) || content.includes(inputtext)) {
            note.classList.remove("hidden");

            highlight(titleEl, inputtext);
            highlight(contentEl, inputtext);

        } else {
            note.classList.add("hidden");
        }
    });
}

//--------------------live search----------------------

searchInput.addEventListener("input", searchtext);
searchBtn.addEventListener("click", searchtext);


// -------------------- HIGHLIGHT --------------------

function highlight(element, query) {
    let text = element.textContent;

    let regex = new RegExp(`(${query})`, "gi");
    element.innerHTML = text.replace(regex, `<mark>$1</mark>`);
}

function resetHighlight(note) {
    note.querySelector(".notes-titleO").innerHTML =
        note.querySelector(".notes-titleO").textContent;

    note.querySelector(".notes-paraO").innerHTML =
        note.querySelector(".notes-paraO").textContent;
}


// -------------------- INPUT BOX EXPAND --------------------

notesContainer.addEventListener("click", () => {
    notesContainer.classList.add("active");
});

document.addEventListener("click", (e) => {
    if (!notesContainer.contains(e.target)) {
        if (noteTitleI.value === "" && noteContentI.value === "") {
            notesContainer.classList.remove("active");
        }
    }
});


// -------------------- INIT --------------------

renderNotes();