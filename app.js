const teamGoal = 350;
const individualGoal = 35;
const weeklyTarget = 7;

// 🔗 REPLACE WITH YOUR SMARTSHEET FORM LINK
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

// Load saved data
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
  const percent = ((total / teamGoal) * 100).toFixed(1);

  document.getElementById("teamHours").innerText = total;
  document.getElementById("teamPercent").innerText = percent;

  // 🇺🇸 Proper bottom-up reveal using clip-path
  const flag = document.getElementById("flagColor");

  // 100% hidden at 0 progress
  // 0% hidden at 100 progress
  const hiddenAmount = 100 - percent;

  flag.style.clipPath = `inset(${hiddenAmount}% 0 0 0)`;
}

function createScoreboard() {
  const container = document.getElementById("scoreboard");
  container.innerHTML = "";

  teamMembers.forEach(name => {
    const memberDiv = document.createElement("div");
    memberDiv.className = "member";

    // 🔥 Custom Avatar Image
    const avatar = document.createElement("img");
    avatar.src = "Navy-Seal-1.webp"; // Make sure this file exists in your repo
    avatar.className = "avatar";
    avatar.onclick = () => window.open(formLink, "_blank");

    const title = document.createElement("div");
    title.className = "member-name";
    title.innerText = name;

    const hourDisplay = document.createElement("div");
    hourDisplay.className = "hours";
    hourDisplay.innerText = hours[name] + " hrs";

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const progress = document.createElement("div");
    progress.className = "progress";
    progress.style.width = (hours[name] / individualGoal * 100) + "%";

    progressBar.appendChild(progress);

    const plusBtn = document.createElement("button");
    plusBtn.innerText = "+1";
    plusBtn.className = "plus";
    plusBtn.onclick = () => {
      hours[name] += 1;
      saveData();
      createScoreboard();
      updateTeamProgress();
    };

    const minusBtn = document.createElement("button");
    minusBtn.innerText = "-1";
    minusBtn.className = "minus";
    minusBtn.onclick = () => {
      if (hours[name] > 0) {
        hours[name] -= 1;
        saveData();
        createScoreboard();
        updateTeamProgress();
      }
    };

    const input = document.createElement("input");
    input.type = "number";
    input.value = hours[name];
    input.onchange = () => {
      hours[name] = parseInt(input.value) || 0;
      saveData();
      createScoreboard();
      updateTeamProgress();
    };

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
