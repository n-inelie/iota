import { Octokit } from "octokit";
import { Github_Token } from "./dotenv-config";

const octokit = new Octokit({
    auth: Github_Token,
})

async function getRepo(owner: string, repo: string) {
    return await octokit.request("GET /repos/{owner}/{repo}",
        {
            owner: owner,
            repo: repo,
        });
}

async function repoBriefDescription(owner: string, repo: string) {
    const full_data = await getRepo(owner, repo);
    return {
        repo_name: full_data.data.name,
        private: full_data.data.private,
        stars: full_data.data.stargazers_count,
    }
}

export { getRepo, repoBriefDescription };
