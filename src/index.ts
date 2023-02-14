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
