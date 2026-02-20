function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

var currentTask = []

if(localStorage.getItem('currentTask')){
  currentTask = JSON.parse(localStorage.getItem('currentTask'))
}else{
  console.log('task list is Empty');
}

function renderTask() {
  var allTask = document.querySelector(".allTask");

  var sum = "";

  currentTask.forEach(function (elem) {
    sum =
      sum +
      `<div class="task">
    <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
    <button>Mark as Completed</button>
    </div>`;
  });

  allTask.innerHTML = sum;
}
renderTask();

let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #check");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  currentTask.push(
    {
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked
    }
)
  localStorage.setItem('currentTask',JSON.stringify(currentTask))
  
  taskInput.value = ''
  taskDetailsInput.value = ''
  taskCheckbox.checked = false

  renderTask()
});




