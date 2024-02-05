import "@johnlindquist/kit";

const gameUrl = "http://localhost:3000/game?playerId=";
const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

for (const playerId of [0, 1, 2, 3]) {
  await exec(
    `open -na "Google Chrome" --args --new-window "${gameUrl + playerId}"`
  );
}

await wait(1500);

let tabs = await getTabs();

for (const playerId of [0, 1, 2, 3]) {
  const tab = tabs.find(({ url }) => url === gameUrl + playerId);
  await focusTab(tab.url);
  exec(`open -g "rectangle://execute-action?name=${positions[playerId]}"`);
}
