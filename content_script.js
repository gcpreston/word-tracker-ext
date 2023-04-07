const forms = document.getElementsByTagName('form');
const form = forms[0];
const difficultChanger = document.getElementById('difficulty-changer');

let difficulty = difficultChanger.value;
let resultKey = 'savedGame_' + difficulty;

difficultChanger.addEventListener('change', () => {
  difficulty = difficultChanger.value;
  resultKey = 'savedGame_' + difficulty;
});

form.addEventListener('submit', () => {
  const result = JSON.parse(localStorage.getItem(resultKey));
  console.log('Result so far:', result);

  if (result.winTime || result.gaveUpTime) {
    console.log('Game finished!');

    postResult(result);
  }
});

async function postResult(data) {
  const { userTeam } = await chrome.storage.local.get(["userTeam"]);

  // Default options are marked with *
  const response = await fetch("http://localhost:4000/api/results", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result: { team_id: userTeam.id, data } }), // body data type must match "Content-Type" header
  }).then((thing) => { console.log("after fetch", thing) });

  return response;
}
