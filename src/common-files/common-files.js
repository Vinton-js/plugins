const glob = require("glob");

module.exports = ({ Check, priorities }) => {
    const commons = [
        {
            file: ".gitignore",
            priority: priorities.INFOS,
        },
        {
            file: "license",
            priority: priorities.WARNING,
        },
        {
            file: "readme",
            priority: priorities.URGENT,
        },
        {
            file: "src",
            priority: priorities.INFOS,
        },
        {
            file: "test",
            priority: priorities.INFOS,
        },
    ];

    return {
        async check (name) {
            const checks = await Promise.all(commons.map(({ file }) => new Promise((resolve) => {
                const path = `${name}/${file}*`;
                glob(path, {
                    nosort: true,
                    nocase: true,
                }, (errors, files) => {
                    resolve(Boolean(files.length));
                });
            })));

            return commons
                .filter((_, index) => !checks[index])
                .map(({ file, priority }) => new Check(`Missing ${file}`, priority));
        },
    };
};
