// ===============================
// CONFIG
// ===============================
const WEEKLY_GOAL = 40;

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

const FORM_LINK = "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb";

// Example demo hours (replace with real data later)
let teamHours = {
  "Rick Rife": 42,
  "Liam Crabtree": 35,
  "Mike Welborn": 38,
  "Ian Bugbee": 45,
  "Mike Chambliss": 30,
  "Daniel Cowan": 40,
  "Kevin Youngblood": 28,
  "Phillip Norris": 41,
  "Richard Osborne": 37,
  "Marcus Smith": 33
};

// ===============================
// FLAG PROGRESS
// ===============================
function updateFlagProgress() {
  const totalHours = Object.values(teamHours).reduce((a, b) => a + b, 0);
  const maxHours = TEAM_MEMBERS.length * WEEKLY_GOAL;
  const percent = Math.min((totalHours / maxHours) * 100, 100);

  document.getElementById("flagFill").style.height = percent + "%";
}

// ===============================
// RENDER TEAM
// ===============================
function renderTeam() {
  const container = document.getElementById("teamContainer");
  container.innerHTML = "";

  TEAM_MEMBERS.forEach(name => {
    const hours = teamHours[name] || 0;
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
      <div class="hours">${hours} hrs</div>
      <div class="progressBar">
        <div class="progressFill" style="width:${percent}%"></div>
      </div>
    `;

    container.appendChild(card);
  });

  updateFlagProgress();
}

// ===============================
// INIT
// ===============================
renderTeam();
