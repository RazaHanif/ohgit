const fs = require("fs")
const path = require("path")

const configPath = path.join(process.cwd(), ".ohgitrc.json")

// Default commit message & delay of 2 mins
const DEFAULTS = {
    commitMessage: "OhGit Auto-Commit",
    commitDelay: 2 * 60000,
}

// Load config or return defaults - if config doesnt exist
const loadConfig = () => {
    if (fs.existsSync(configPath)) {
        try {
            return { 
                ...DEFAULTS, 
                ...JSON.parse(fs.readFileSync(configPath, 'utf-8')) 
            }
        } catch (err) {
            console.error('Error reading config file'.red, err)
            return DEFAULTS
        }
    }
    return DEFAULTS
}

// Save config / creates file if it doesnt exist already
const saveConfig = (newConfig) => {
    const config = { ...loadConfig(), ...newConfig }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

// Set commit message
const setCommitMessage = (message) => {
    saveConfig({ commitMessage: message })
    console.log(`✅ Commit message set to: "${message}"`.green)
}

// Set commit delay (in minutes)
const setCommitDelay = (minutes) => {
    const delayMs = parseFloat(minutes) * 60000
    if (isNaN(delayMs) || delayMs <= 0) {
        console.log("Please provide a valid number of minutes.".red)
        process.exit(1)
    }
    saveConfig({ commitDelay: delayMs })
    console.log(`✅ Commit delay set to: ${minutes} minute(s)`.green)
}

// Reset config to defaults
const resetConfig = () => {
    if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath)
    }
    console.log("🔄 OhGit settings have been reset to defaults!".yellow)
}

module.exports = { loadConfig, setCommitMessage, setCommitDelay, resetConfig }
