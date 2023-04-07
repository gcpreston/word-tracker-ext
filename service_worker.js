chrome.runtime.onInstalled.addListener(async () => {
  fetch("http://localhost:4000/api/teams", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then((json) => {
      const byId = json.data.reduce((acc, team) => {
        acc[team.id] = team;
        return acc;
      }, {});
      chrome.storage.local.set({ teams: byId });
    });
});
