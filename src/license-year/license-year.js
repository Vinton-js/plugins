const { resolve } = require("path");
const { readFile } = require("fs").promises;

module.exports = ({ Check, priorities }) => ({
    async check (name) {
        const path = resolve(process.cwd(), name, "license");

        let license;
        try {
            license = (await readFile(path)).toString();
        }
        catch {
            return false;
        }

        const year = +license.match(/Copyright.+(\d{4})/i)?.[1];

        if (year) {
            const currentYear = new Date().getFullYear();

            if (year !== currentYear) {
                return new Check("Copyright year is not up-to-date", priorities.WARNING);
            }
        }

        return false;
    },
});
