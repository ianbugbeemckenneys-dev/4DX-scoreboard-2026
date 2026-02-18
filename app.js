// ===============================
// CONFIG
// ===============================
const WEEKLY_GOAL = 40;
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
let teamHours = JSON.parse(localStorage.getItem("teamHours")) || {};

TEAM_MEMBERS.forEach(name => {
  if (teamHours[name] === undefined) teamHours[name] = 0;
});

function saveData() {
  localStorage.setItem("teamHours", JSON.stringify(teamHours));
}

// ===============================
// TEAM TOTAL + FLAG
// ===============================
function updateTotalsAndFlag() {
  const totalHours = Object.values(teamHours).reduce((a, b) => a + b, 0);
  const maxHours = TEAM_MEMBERS.length * WEEKLY_GOAL;
  const percent = Math.min((totalHours / maxHours) * 100, 100);

  document.getElementById("totalHours").innerText =
    `Team Total: ${totalHours} / ${maxHours} hrs`;

  document.getElementById("totalPercent").innerText =
    `${percent.toFixed(1)}% of Weekly Goal`;

  // TRUE bottom-up fill using clip-path
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
    const hours = teamHours[name];
    const percent = Math.min((hours / WEEKLY_GOAL) * 100, 100);
    const metGoal = hours >= WEEKLY_GOAL;

    const card = document.createElement("div");
    card.className = "memberCard";

    card.innerHTML = `
      <a href="${FORM_LINK}" target="_blank">
        <img 
          class="avatar" 
          src="${metGoal ? "Navy-Seal-1.webp" : "Skull_and_Crossbones.png"}"
          alt="${name}"
        />
      </a>

      <div class="memberName">${name}</div>
      <div class="hoursDisplay">${hours} hrs</div>

      <div class="progressBar">
        <div class="progressFill" style="width:${percent}%"></div>
      </div>

      <div class="controls">
        <button class="minusBtn">-1</button>
        <input type="number" class="hourInput" value="${hours}" min="0">
        <button class="plusBtn">+1</button>
      </div>

      <div class="weeklyStatus">
        ${
          metGoal
            ? `<span class="metGoal">✔ Weekly Goal Met</span>`
            : `<span class="needsGoal">Needs ${WEEKLY_GOAL - hours} hrs</span>`
        }
      </div>
    `;

    const minusBtn = card.querySelector(".minusBtn");
    const plusBtn = card.querySelector(".plusBtn");
    const input = card.querySelector(".hourInput");

    minusBtn.onclick = () => {
      if (teamHours[name] > 0) {
        teamHours[name]--;
        saveData();
        renderTeam();
      }
    };

    plusBtn.onclick = () => {
      teamHours[name]++;
      saveData();
      renderTeam();
    };

    input.onchange = () => {
      teamHours[name] = parseInt(input.value) || 0;
      saveData();
      renderTeam();
    };

    container.appendChild(card);
  });

  updateTotalsAndFlag();
}

// ===============================
// INIT
// ===============================
renderTeam();
