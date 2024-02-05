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
    presenter: "2D7leZQmqMGh5OolrHvxqsE9mdehQo4fCImfHCv0_iI",
    copresenter: "a3FRGLgJpK3HiH8TLcBLob5tjo9hGj8E8dComEkQx2E",
    moderator: "YGVmcrkmVLOEVOIPIh_K3qS4p03u7KkHqNJqE_6MiS8",
    hostsOnly: "UVr5bAsprx3mw40jXvD_izO9jHoNaFUIEva7emyrj8I",
    operator: "UIERHqaafFY0lLpIHFcv5GqnEB59RWNT38p0s-PtFd0",
    "2ndCopresenter": "fmxPiJtLqKCXMQ2u5tsYvGCxkMntJgB8p-rLY6C6cRo",
    dashboard: 42,
  },
  rtmp: {
    presenter: "k-Cgc2_pumDYrgmLsvvVi0KKgoq1lIfK9LmWFrW0wSs",
    moderator: "Y8WEAS0d1S8kn2H7omCETy-gcYgMvynpvfoUd2wUwOc",
    dashboard: 13,
  },
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

if (role === "dashboard") {
  const link = `http://localhost:3000/admin/episodes/${secretKeys[webinarType].dashboard}`;
  openInArc(link);
} else {
  const isDryRun =
    (await arg("Dry Run", ["yes", "no"].map(makeOptions))) === "yes";

  const baseLink = `http://localhost:3000/domain/admin-account.localhost/manage/`;
  const secretKey = secretKeys[webinarType][role];

  const link = `${baseLink}${secretKey}/${isDryRun ? "dry_run" : ""}`;
  openInArc(link);
}
