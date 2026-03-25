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
        <div class="task-text">
      <h5>
        ${elem.task}
        <span class="${elem.imp}">imp</span>
      </h5>

      <p class="task-details">
        ${elem.details}
      </p>
  </div>
    <button id=${idx}>Mark as Completed</button>
    </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);

        renderTask();
      });
    });

    document.querySelectorAll(".task").forEach(function (taskBox) {
      taskBox.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") return;

        taskBox.classList.toggle("active");
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

    renderTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value=${savedData}>
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = data.content;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}

motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function upDateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  upDateTimer();

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          upDateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          upDateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    upDateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function dailyGoals() {
  var currentGoal = [];

  if (localStorage.getItem("currentGoal")) {
    currentGoal = JSON.parse(localStorage.getItem("currentGoal"));
  } else {
    console.log("goal list is Empty");
  }

  function renderTask() {
    let allGoal = document.querySelector(".allGoal");

    let sum = "";

    currentGoal.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="goal">
            <div class="goal-text">
              <h5>${elem.goal}<span class="${elem.imp}">imp</span></h5>
              <p class="goal-details">${elem.details}</p>
            </div>
            <button id=${idx}>Mark as Completed</button>
            </div>`;
    });

    allGoal.innerHTML = sum;

    localStorage.setItem("currentGoal", JSON.stringify(currentGoal));

    document.querySelectorAll(".goal button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentGoal.splice(btn.id, 1);

        renderTask();
      });
    });

    document.querySelectorAll(".goal").forEach(function (goalBox) {
      goalBox.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") return;
        goalBox.classList.toggle("active");
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addGoal form");
  let goalInput = document.querySelector(".addGoal form #goal-input");
  let goalDetailsInput = document.querySelector(".addGoal form textarea");
  let goalCheckbox = document.querySelector(".addGoal form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentGoal.push({
      goal: goalInput.value,
      details: goalDetailsInput.value,
      imp: goalCheckbox.checked,
    });

    renderTask();

    goalCheckbox.checked = false;
    goalInput.value = "";
    goalDetailsInput.value = "";
  });
}

dailyGoals();

function weatherFunctionality() {
  var city = "jawai bandh";
  var apiKey = "4262348c58b74fb997f205825262502";
  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var precipitation = document.querySelector(".header2 .precipitation");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");

  var data = null;

  async function weatherAPICall() {
    var response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity} %`;
    precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c} %`;
  }

  weatherAPICall();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const totalMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = totalMonth[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;

    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} AM`;
    }
  }

  timeDate();

  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality()

function changeTheme(){
  var theme = document.querySelector('.theme')
var rootElement = document.documentElement

var flag = 0

theme.addEventListener("click",function(){

  if(flag == 0){
    rootElement.style.setProperty('--pri','#79af5a')
    rootElement.style.setProperty('--sec','#F5F5F7')
    rootElement.style.setProperty('--tri1','grey')
    rootElement.style.setProperty('--tri2','#454242')
    flag = 1
  }else if(flag == 1){
    rootElement.style.setProperty('--pri','#C8AAAA')
    rootElement.style.setProperty('--sec','#FFDAB3')
    rootElement.style.setProperty('--tri1','#574964')
    rootElement.style.setProperty('--tri2','#9F8383')
    flag = 2
  }else{
    rootElement.style.setProperty('--pri','#87996ae5')
    rootElement.style.setProperty('--sec','#F8F3E1')
    rootElement.style.setProperty('--tri1','#111')
    rootElement.style.setProperty('--tri2','#AEB784')
    flag = 0 
  }
  
})
}

changeTheme()