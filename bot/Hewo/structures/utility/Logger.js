const chalk = require("chalk")
const path = require("path")
const fs = require("fs")

module.exports = class Logger {
    constructor(location) {
        this.location = location
    }

    get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

    async writeFile(message) {
		const month = new Date().getMonth()
        const day = new Date().getDate()
        const year = new Date().getFullYear()
		const path = `${this.directory}${this.location}`
		fs.readFile(`${path}/${month}-${day}-${year}.txt`, "utf8", (err, data) => {
			if(err) {
				if(!fs.existsSync(`${path}/${month}-${day}-${year}.txt`)) {
					if(!fs.existsSync(path)) {
						fs.mkdirSync(path)
					}
					return fs.writeFileSync(`${path}/${month}-${day}-${year}.txt`, `${message}\n`)
				}
			}
			fs.appendFileSync(`${path}/${month}-${day}-${year}.txt`, `${message}\n`)
		})
	}

    async info(label, message) {
        const hour = new Date().getHours()
		const minutes = new Date().getMinutes()
		const seconds = new Date().getSeconds()
		const log = `[${hour % 12 == 0 ? 12 : hour % 12}:${minutes}:${seconds} ${hour/12 >= 1 ? "PM": "AM"}] [INFO] [${label}]`
		await this.writeFile(`${log} ${message}`)
		console.log(chalk.blue.bold(log), message)
    }

    async debug(label, message) {
        const hour = new Date().getHours()
		const minutes = new Date().getMinutes()
		const seconds = new Date().getSeconds()
		const log = `[${hour % 12 == 0 ? 12 : hour % 12}:${minutes}:${seconds} ${hour/12 >= 1 ? "PM": "AM"}] [DEBUG] [${label}]`
		await this.writeFile(`${log} ${message}`)
		console.log(chalk.magenta.bold(log), message)
    }

    async warn(label, message) {
        const hour = new Date().getHours()
		const minutes = new Date().getMinutes()
		const seconds = new Date().getSeconds()
		const log = `[${hour % 12 == 0 ? 12 : hour % 12}:${minutes}:${seconds} ${hour/12 >= 1 ? "PM": "AM"}] [WARNING] [${label}]`
		await this.writeFile(`${log} ${message}`)
		console.log(chalk.orange.bold(log), message)
    }

    async error(label, message) {
        const hour = new Date().getHours()
		const minutes = new Date().getMinutes()
		const seconds = new Date().getSeconds()
		const log = `[${hour % 12 == 0 ? 12 : hour % 12}:${minutes}:${seconds} ${hour/12 >= 1 ? "PM": "AM"}] [ERROR] [${label}]`
		await this.writeFile(`${log} ${message}`)
		console.log(chalk.red.bold(log), message)
    }
}