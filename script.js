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


function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
    <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
    <button id=${idx}>Mark as Completed</button>
    </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);

        renderTask();

        location.reload();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTask()

    taskCheckbox.checked = false
    taskInput.value = ''
    taskDetailsInput.value = ''
  });
}

todoList();

function dailyPlanner(){
  var dayPlanner = document.querySelector('.day-planner')

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var hours = Array.from({length:18},(_,idx)=>`${6+idx}:00 - ${7+idx}:00`)


wholeDaySum = ''
hours.forEach(function(elem,idx){

  var savedData = dayPlanData[idx] || ''

  wholeDaySum = wholeDaySum + `<div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value=${savedData}> 
  </div>`
})

dayPlanner.innerHTML = wholeDaySum

var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
  elem.addEventListener('input',function(){
    dayPlanData[elem.id] = elem.value

    localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
    
  })
})
}

dailyPlanner();