import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leadstracker-f4f31-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

onValue(referenceInDB, function (snapshot) {
    if(snapshot.exists()){
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
    }
})

inputBtn.addEventListener("click", function () {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

deleteBtn.addEventListener('dblclick', function () {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' rel='noopener noreferrer' href='${leads[i]}'>
                ${[leads[i]]}
            </a>
         </li>
    `
    }
    ulEl.innerHTML = listItems
}
