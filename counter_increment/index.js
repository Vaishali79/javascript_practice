let countEl = document.getElementById("count-el")
let previous=document.getElementById("previous");
let count = 0

function increment() {
    count = count + 1;
    countEl.innerText = count;
    console.log(count);
}

function save() {
    console.log(count)
    let temp=count+" - ";
    count=0;
    previous.textContent+=temp;
    countEl.innerText=count;

}

