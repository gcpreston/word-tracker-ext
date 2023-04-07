function setTeamMessage(userTeam) {
  document.getElementById("team-message").innerHTML = userTeam.name;
}

async function handleTeamSave(event) {
  event.preventDefault();
  const selectedId = event.target[0].value;
  console.log('handleteamsave got thing', selectedId);

  const { teams } = await chrome.storage.local.get(["teams"]);
  await chrome.storage.local.set({ userTeam: teams[selectedId] });

  setTeamMessage(teams[selectedId]);
}

document.addEventListener('DOMContentLoaded', async function () {
  const { teams } = await chrome.storage.local.get(["teams"]);
  const { userTeam } = await chrome.storage.local.get(["userTeam"]);

  console.log('got user team', userTeam);
  if (userTeam) {
    setTeamMessage(userTeam);
  }

  document.getElementById("team-select").innerHTML = Object.values(teams).map(team => `<option value=${team.id}>${team.name}</option>`);
  document.getElementById("team-form").addEventListener("submit", handleTeamSave);
});
