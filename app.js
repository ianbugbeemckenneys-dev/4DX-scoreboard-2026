// ===============================
// CONFIG
// ===============================
const weeklyTarget = 7;
const TEAM_GOAL = 350;
const FORM_LINK = "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb";

const TEAM_MEMBERS = [
  "Rick Rife",
  "Liam Crabtree",
  "Mike Welborn",
  "Ian Bugbee",
  "Mike Chambliss",
  "Daniel Cowan",
  "Kevin Youngblood",
  "Phillip Norris",
  "Richard Osborne",
  "Marcus Smith"
];

// ===============================
// LOAD / SAVE
// ===============================
let hours = JSON.parse(localStorage.getItem("teamHours")) || {};

TEAM_MEMBERS.forEach(name => {
  if (hours[name] === undefined) hours[name] = 0;
});

function saveData() {
  localStorage.setItem("teamHours", JSON.stringify(hours));
}

// ===============================
// TEAM PROGRESS + FLAG
// ===============================
function updateTeamProgress() {
  const total = Object.values(hours).reduce((a, b) => a + b, 0);
  const percent = Math.min((total / TEAM_GOAL) * 100, 100);

  document.getElementById("teamHours").innerText = total;
  document.getElementById("teamPercent").innerText = percent.toFixed(1);

  // True bottom-up color reveal
  const flag = document.getElementById("flagColor");
  flag.style.clipPath = `inset(${100 - percent}% 0 0 0)`;
}

// ===============================
// RENDER TEAM
// ===============================
function renderTeam() {
  const container = document.getElementById("teamContainer");
  container.innerHTML = "";

  TEAM_MEMBERS.forEach(name => {

    const percentIndividual = Math.min((hours[name] / weeklyTarget) * 100, 100);
    const metWeekly = hours[name] >= weeklyTarget;

    const card = document.createElement("div");
    card.className = "memberCard";

    card.innerHTML = `
      <a href="${FORM_LINK}" target="_blank">
        <img 
          class="avatar" 
          src="${metWeekly ? "Navy-Seal-1.webp" : "Skull_and_Crossbones.png"}"
          alt="${name}"
        />
      </a>

      <div class="memberName">${name}</div>
      <div class="hoursDisplay">${hours[name]} hrs</div>

      <div class="progressBar">
        <div class="progressFill" style="width:${percentIndividual}%"></div>
      </div>

      <div class="controls">
        <button class="minusBtn">-1</button>
        <input type="number" class="hourInput" value="${hours[name]}" min="0">
        <button class="plusBtn">+1</button>
      </div>
    `;

    // Weekly Indicator (your exact requested version)
    const weeklyIndicator = document.createElement("div");
    weeklyIndicator.className = "weekly";

    if (hours[name] >= weeklyTarget) {
      weeklyIndicator.innerText = "✔ Weekly Target Met";
      weeklyIndicator.style.color = "#22c55e";
    } else {
      weeklyIndicator.innerText =
        "Needs " + (weeklyTarget - hours[name]) + " hrs for weekly target";
      weeklyIndicator.style.color = "#facc15";
    }

    card.appendChild(weeklyIndicator);

    // Controls
    const minusBtn = card.querySelector(".minusBtn");
    const plusBtn = card.querySelector(".plusBtn");
    const input = card.querySelector(".hourInput");

    minusBtn.onclick = () => {
      if (hours[name] > 0) {
        hours[name]--;
        saveData();
        renderTeam();
      }
    };

    plusBtn.onclick = () => {
      hours[name]++;
      saveData();
      renderTeam();
    };

    input.onchange = () => {
      hours[name] = parseInt(input.value) || 0;
      saveData();
      renderTeam();
    };

    container.appendChild(card);
  });

  updateTeamProgress();
}

// ===============================
// INIT
// ===============================
renderTeam();
