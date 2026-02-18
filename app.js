const TEAM_GOAL = 350;
const WEEKLY_GOAL = 10;

const FORM_LINK = "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb";

let teamMembers = [
  { name: "Rick Rife", hours: 0 },
  { name: "Liam Crabtree", hours: 0 },
  { name: "Mike Welborn", hours: 0 },
  { name: "Ian Bugbee", hours: 0 },
  { name: "Mike Chambliss", hours: 0 },
  { name: "Daniel Cowan", hours: 0 },
  { name: "Kevin Youngblood", hours: 0 },
  { name: "Phillip Norris", hours: 0 },
  { name: "Richard Osborne", hours: 0 },
  { name: "Marcus Smith", hours: 0 }
];

function updateDisplay() {
  updateScoreboard();
  updateTeamProgress();
}

function updateScoreboard() {
  const board = document.getElementById("scoreboard");
  board.innerHTML = "";

  teamMembers.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";

    // Clickable Avatar
    const avatarLink = document.createElement("a");
    avatarLink.href = FORM_LINK;
    avatarLink.target = "_blank";

    const avatar = document.createElement("img");
    avatar.className = "avatar";

    if (member.hours >= WEEKLY_GOAL) {
      avatar.src = "Navy-Seal-1.webp";
    } else {
      avatar.src = "Skull_and_Crossbones.png";
    }

    avatarLink.appendChild(avatar);

    const name = document.createElement("h3");
    name.textContent = member.name;

    const hours = document.createElement("p");
    hours.textContent = `${member.hours} hrs`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "+1 Hour";
    addBtn.onclick = () => {
      member.hours++;
      updateDisplay();
    };

    card.appendChild(avatarLink);
    card.appendChild(name);
    card.appendChild(hours);
    card.appendChild(addBtn);

    board.appendChild(card);
  });
}

function updateTeamProgress() {
  const totalHours = teamMembers.reduce((sum, m) => sum + m.hours, 0);
  const percent = Math.min((totalHours / TEAM_GOAL) * 100, 100);

  const progressText = document.getElementById("team-progress-text");
  progressText.textContent =
    `Team Progress: ${totalHours}/350 hrs (${percent.toFixed(1)}%)`;

  const flagFill = document.getElementById("flag-fill");
  flagFill.style.height = percent + "%";
}

updateDisplay();
