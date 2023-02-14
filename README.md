## ✨ Trigger.dev GitHub Stars to Slack

<a href="https://render.com/deploy?repo=https://github.com/triggerdotdev/github-stars-to-slack">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

This repo contains a [GitHub newStarEvent](https://docs.trigger.dev/integrations/apis/github/events/new-star) Trigger that will run whenever the specified repository gets a new ⭐️:

```ts
import { Trigger } from "@trigger.dev/sdk";
import * as github from "@trigger.dev/github";
import * as slack from "@trigger.dev/slack";

const repo =
  process.env.GITHUB_REPOSITORY ?? "triggerdotdev/github-stars-to-slack";

new Trigger({
  id: "github-stars-to-slack",
  name: "GitHub Stars to Slack",
  on: github.events.newStarEvent({
    repo,
  }),
  run: async (event) => {
    await slack.postMessage("⭐️", {
      channelName: "github-stars",
      text: `New GitHub star from \n<${event.sender.html_url}|${event.sender.login}>. You now have ${event.repository.stargazers_count} stars!`,
    });
  },
}).listen();
```

## Customize it

1. Make sure and update the `repo` parameter to point to a GitHub repository you manage by setting the `GITHUB_REPOSITORY` environment variable.
2. Feel free to customize [postMessage](https://docs.trigger.dev/integrations/apis/slack/actions/post-message) call with more data from the [newStar Event](https://docs.trigger.dev/integrations/apis/github/events/new-star#event)

## Run locally

First, clone the repo and install dependencies:

```sh
git clone https://github.com/triggerdotdev/github-stars-to-slack.git
cd github-stars-to-slack
npm install
```

Then create a `.env` file with your development Trigger.dev API Key:

```sh
echo "TRIGGER_API_KEY=<APIKEY>" >> .env
```

And finally you are ready to run the process:

```sh
npm run dev
```

You should see a message like the following:

```
[trigger.dev]  ✨ Connected and listening for events [github-stars-to-slack]
```
