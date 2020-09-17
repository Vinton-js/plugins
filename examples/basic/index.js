// Mocks
const hasSomething = () => {};
const addSomething = () => {};

// Plugin should export a function returning an object or an object directly
// The parameter hold helpers for the plugin
module.exports = (Vinton) => {
    return {
        // Called on every user's projects (required)
        check (projectName) {
            // Perform some check on the project folder
            if (hasSomething(projectName)) {
                // Message displayed to users
                const message = "Missing something.";

                // Priority of the message
                // NONE:    no highlight (just some insight)
                // OK:      success highlight (something is good)
                // INFOS:   simple highlight (basic information)
                // WARNING: warn the user (something wrong)
                // ALERT:   strong highlight (danger or very bad practice)
                const priority = Vinton.priorities.INFOS;

                // Should Vinton add a "fix" button
                const isFixable = true;

                // Return an array of Alert or a single Alert
                // Any object with a "message" and "priority" property will do
                return [
                    new Vinton.Alert(message, priority, isFixable),
                ];
            }

            return false;
        },

        // Called when user click on "fix" button (optional)
        fix (projectName, alertMessage) {
            // You can check which Alert is asked for fix using the "alertMessage" parameter
            if (alertMessage === "Missing something.") {
                // Perform some action
                addSomething(projectName);
            }
        },
    };
};
