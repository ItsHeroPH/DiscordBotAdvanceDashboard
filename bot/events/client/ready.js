const { Event } = require("../../Hewo");

module.exports = class extends Event {
    async run() {
        require("../../dashboard")(this.client)
        this.client.logger.info("STATUS", `${this.client.user.username} is online`);
    }
}