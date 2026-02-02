/* =========================
   CONFIGURATION
========================= */

// Annual target per person
const TARGET_HOURS = 200;

// Weekly lead-measure target (hours per week)
const WEEKLY_TARGET = 5;

// Week number in the year (1–52)
const CURRENT_WEEK = 20;

// Avatar image
const AVATAR_URL = "https://firstliberty.org/wp-content/uploads/2021/10/Navy-Seal-1.png";

/* =========================
   TEAM DATA
========================= */

let team = [
  { name: "ALPHA",   hours: 120, form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "BRAVO",   hours: 95,  form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "CHARLIE", hours: 80,  form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "DELTA",   hours: 150, form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "ECHO",    hours: 100, form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "FOXTROT", hours: 110, form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "GOLF",    hours: 90,  form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "HOTEL",   hours: 70,  form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "INDIA",   hours: 130, form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" },
  { name: "JULIET",  hours: 105, form: "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb" }
];

const board = document.getElementById("scoreboard");

/* =========================
   PERSISTENCE (LOCAL)
========================= */

function load() {
  const saved = localStorage.getItem("trainingData");
  if (saved) team = JSON.parse(saved);
}

function save() {
  localStorage.setItem("trainingData", JSON.stringify(team));
}

/* =========================
   RENDER UI
========================= */

function render() {
  board.innerHTML = "";
  let teamPercentTotal = 0;

  const weeklyExpectedHours = WEEKLY_TARGET * CURRENT_WEEK;
  const weeklyPercent = Math.min(
    Math.round((weeklyExpectedHours / TARGET_HOURS) * 100),
    100
  );

  team.forEach((member, index) => {
    const percent = Math.min(
      Math.round((member.hours / TARGET_HOURS) * 100),
      100
    );

    teamPercentTotal += percent;

    const row = document.createElement("div");
    row.className = "lane";

    row.innerHTML = `
      <span class="name">${member.name}</span>

      <div class="controls">
        <button onclick="changeHours(${index}, -1)">−</button>
        <input type="number" min="0"
               value="${member.hours}"
               onchange="setHours(${index}, this.value)">
        <button onclick="changeHours(${index}, 1)">+</button>
      </div>

      <div class="track">
        <div class="weekly-marker" style="left:${weeklyPercent}%"></div>

        <a class="avatar"
           href="${member.form}"
           target="_blank"
           title="Log training hours"
           style="left:${percent}%">
          <img src="${AVATAR_URL}">
        </a>
      </div>

      <span class="percent">${percent}%</span>
    `;

    board.appendChild(row);
  });

  document.getElementById("teamPercent").innerText =
    Math.round(teamPercentTotal / team.length) + "%";

  save();
}

/* =========================
   CONTROLS
========================= */

function changeHours(index, delta) {
  team[index].hours += delta;
  if (team[index].hours < 0) team[index].hours = 0;
  render();
}

function setHours(index, value) {
  team[index].hours = Number(value) || 0;
  render();
}

/* =========================
   INIT
========================= */

load();
render();
