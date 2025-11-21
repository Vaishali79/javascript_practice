import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")


const firebaseConfig={
    databaseURL: "https://leads-tracker-app-51703-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database=getDatabase(app)
// console.log(app.databaseURL)
const referenceInDB= ref(database,"leads")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


onValue(referenceInDB,function(snapshot){
    if(snapshot.exists){
        const leads=Object.values(snapshot.val())
        render(leads)
    }
})
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        push(referenceInDB, tabs[0].url)
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    localStorage.clear()
    myLeads = []
    render(myLeads)
    // ulEl.innerHTML=""
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})