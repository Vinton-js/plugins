const { resolve } = require("path");
const Git = require("nodegit");

module.exports = ({ Check }) => ({
    async check (name) {
        const checks = [];

        const path = resolve(process.cwd(), name);

        try {
            const repo = await Git.Repository.open(path);
            const statuses = await repo.getStatus();
            if (statuses.length) {
                checks.push(new Check("Changes needs to be committed."));
            }

            // FIXME: Main branch doesn't have to be "master", maybe check all branches
            const masterBranch = await repo.getReference("master");
            const masterLatestCommit = masterBranch.target().toString();
            const masterUpstream = await Git.Branch.upstream(masterBranch);
            const upstreamLatestCommit = masterUpstream.target().toString();
            if (masterLatestCommit !== upstreamLatestCommit) {
                checks.push(new Check("Commits need to be pushed/pulled."));
            }

            return checks;
        }
        catch {
            return false;
        }
    },
});
