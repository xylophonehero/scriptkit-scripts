const openInArc = (link) =>
  applescript(`
    tell application "Arc" 
      tell front window
        tell space "WG"
          make new tab with properties {URL:"${link}"}
        end tell
      end tell
      activate
    end tell
`);

const secretKeys = {
  webrtc: {
    presenter: "EWgfbipnNT7F7h2wCYHKmEh0uLRYza6hz-kTdUjFYKU",
    copresenter: "9-QGn37ur8u5ixBsGBVQGty6238KRTBhSOxKwk7S4WI",
    moderator: "z1wBLHkmzZ08G0jzbC9TqyEdtHXBIbtscLzQWgUNbN8",
    operator: "XQ3Re10sX7jm8ge5_4WLoblZfIbZR1f9qWS-9U-p18A",
    "2ndCopresenter": "mb2GIY3OuiuXoJhmssZf3WFDaciL6D70yndGXSSGJPI",
    dashboard: 1,
    viewer: "Vzkh894iD1vTszlzM0c36F_qk2-vNyyNA0UNoCGihZY",
    registraion: 1,
  },
  rtmp: {
    presenter: "cXi50v6DgwNscYYsoXzNP4G0BLp3HnAaFBVY6gqDPQM",
    moderator: "iOQqGPPDeeOlWPBdqs90dssCCeXJZTPbN9v7nAUPoPo",
    dashboard: 4,
  },
  superAdmin:{
    local: 'http://localhost:3000/super_admin',
    prod: 'https://app.webinargeek.com/super_admin',
    staging: 'https://app.qwebinar.nl/super_admin',
  },
  // automated: {
  //   moderator: "_ZfX2TnaQcIVagKxdo6fjGckfQhEtQL8wRmXcsaU13Q",
  //   dashboard: 7,
  // },
};

const makeOptions = (opt) => {
  return {
    name: `[${opt[0]}]${opt.slice(1)}`,
    value: opt,
  };
};

const webinarType = await arg(
  "Webinar Type",
  Object.keys(secretKeys).map(makeOptions),
);

const role = await arg(
  "Role",
  Object.keys(secretKeys[webinarType]).map(makeOptions),
);

if (webinarType === 'superAdmin') {
  openInArc(secretKeys[webinarType][role]);
} else if (role === "dashboard") {
  const link = `http://localhost:3000/admin/episodes/${secretKeys[webinarType].dashboard}`;
  openInArc(link)
} else if (role === "registraion") {
  const link = `http://localhost:3000/admin/episodes/${secretKeys[webinarType].dashboard}/registration_page/edit_template`;
  openInArc(link);
} else if (role === "viewer") {
  const link = `http://localhost:3000/domain/admin-account.localhost/watch/${secretKeys[webinarType][role]}/`;
  openInArc(link);
} else {
  const isDryRun =
    (await arg("Dry Run", ["yes", "no"].map(makeOptions))) === "yes";

  const baseLink = `http://localhost:3000/domain/admin-account.localhost/manage/`;
  const secretKey = secretKeys[webinarType][role];

  const link = `${baseLink}${secretKey}/${isDryRun ? "dry_run" : ""}`;
  openInArc(link);
}
