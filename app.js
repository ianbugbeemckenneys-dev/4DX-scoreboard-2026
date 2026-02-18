const teamGoal = 350;
const individualGoal = 35;
const weeklyTarget = 7;

const formLink = "https://app.smartsheet.com/b/form/03ecfd8c10e14224a2ceae41b3852bcb";

const teamMembers = [
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

// Load saved hours
let hours = JSON.parse(localStorage.getItem("trainingHours")) || {};
teamMembers.forEach(name => {
  if (!hours[name]) hours[name] = 0;
});

function saveData() {
  localStorage.setItem("trainingHours", JSON.stringify(hours));
}

function calculateTeamTotal() {
  return Object.values(hours).reduce((a, b) => a + b, 0);
}

function updateTeamProgress() {
  const total = calculateTeamTotal();
  const percent = Math.min((total / teamGoal) * 100, 100);

  document.getElementById("teamProgressText").innerText =
    `Team Progress: ${total}/350 hrs (${percent.toFixed(1)}%)`;

  // Bottom-up fill
  document.getElementById("flagFill").style.height = percent + "%";
}

function createScoreboard() {
  const container = document.getElementById("scoreboard");
  container.innerHTML = "";

  teamMembers.forEach(name => {
    const memberDiv = document.createElement("div");
    memberDiv.className = "member";

    // Avatar
    const avatar = document.createElement("img");
    avatar.src = hours[name] >= weeklyTarget
      ? "Navy-Seal-1.webp"
      : "Skull_and_Crossbones.png";

    avatar.className = "avatar";
    avatar.onclick = () => window.open(formLink, "_blank");

    // Name
    const title = document.createElement("div");
    title.className = "member-name";
    title.innerText = name;

    // Hours
    const hourDisplay = document.createElement("div");
    hourDisplay.className = "hours";
    hourDisplay.innerText = hours[name] + " hrs";

    // Progress Bar
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const progress = document.createElement("div");
    progress.className = "progress";
    progress.style.width =
      Math.min((hours[name] / individualGoal) * 100, 100) + "%";

    progressBar.appendChild(progress);

    // Buttons
    const plusBtn = document.createElement("button");
    plusBtn.innerText = "+1";
    plusBtn.onclick = () => {
      hours[name]++;
      saveData();
      createScoreboard();
      updateTeamProgress();
    };

    const minusBtn = document.createElement("button");
    minusBtn.innerText = "-1";
    minusBtn.onclick = () => {
      if (hours[name] > 0) {
        hours[name]--;
        saveData();
        createScoreboard();
        updateTeamProgress();
      }
    };

    // Input
    const input = document.createElement("input");
    input.type = "number";
    input.value = hours[name];
    input.className = "hour-input";
    input.onchange = () => {
      hours[name] = parseInt(input.value) || 0;
      saveData();
      createScoreboard();
      updateTeamProgress();
    };

    // Weekly Indicator
    const weeklyIndicator = document.createElement("div");
    weeklyIndicator.className = "weekly";

    if (hours[name] >= weeklyTarget) {
      weeklyIndicator.innerText = "✔ Weekly Target Met";
      weeklyIndicator.style.color = "#22c55e";
    } else {
      weeklyIndicator.innerText =
        `Needs ${weeklyTarget - hours[name]} hrs for weekly target`;
      weeklyIndicator.style.color = "#facc15";
    }

    memberDiv.appendChild(avatar);
    memberDiv.appendChild(title);
    memberDiv.appendChild(hourDisplay);
    memberDiv.appendChild(progressBar);
    memberDiv.appendChild(plusBtn);
    memberDiv.appendChild(minusBtn);
    memberDiv.appendChild(input);
    memberDiv.appendChild(weeklyIndicator);

    container.appendChild(memberDiv);
  });

  updateTeamProgress();
}

createScoreboard();
