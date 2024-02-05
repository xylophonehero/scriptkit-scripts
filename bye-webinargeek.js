// Name: Bye WebinarGeek

import "@johnlindquist/kit"

const messages = ["Bye :wave:"]
async function getMessage() {
  let message = await arg("Tell me what you did today")

  if (message !== "") {
    messages.push(message)
    await getMessage()
  }
}

await getMessage()

await div(
  md(
    messages
      .map((message, i) => (i === 0 ? message : `* ${message}`))
      .join("\n")
  )
)
