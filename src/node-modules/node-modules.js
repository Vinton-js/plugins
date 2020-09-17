const { resolve } = require("path");
const { stat } = require("fs").promises;
const del = require("delete").promise;

module.exports = ({ Check }) => ({
    async check (name) {
        const path = resolve(process.cwd(), name, "node_modules");

        try {
            const result = await stat(path);

            if (result.isDirectory()) {
                return new Check("This project has a node_modules, use \"fix\" to remove it.", undefined, true);
            }
        }
        catch {
            // nothing to do
        }

        return false;
    },

    async fix (name) {
        const path = resolve(process.cwd(), name, "node_modules");
        return del(path);
    },
});
