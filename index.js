#!/usr/bin/env node

// Basic imports & destructuring
require('colors')
const { exec } = require('child_process')
const chokidar = require('chokidar')
const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const { loadConfig, setCommitMessage, setCommitDelay } = require('./config')
const { resetConfig } = require('./config')


// Ensure script is running inside a Git repository
const gitDir = path.join(process.cwd(), '.git')
if (!fs.existsSync(gitDir)) {
    console.log('This is not a Git repository.'.red)
    process.exit(1)
}

// Handle CLI arguments
const argv = yargs
    .option('set-message', {
        alias: 'm',
        describe: 'Set a custom auto-commit message',
        type: 'string',
    })
    .option('set-delay', {
        alias: 'd',
        describe: 'Set a custom auto-commit delay in minutes',
        type: 'number',
    })
    .option('reset', {
        describe: 'Reset OhGit settings to default values',
        type: 'boolean',
    })
    .help()
    .argv

// Set commit message
if (argv.setMessage) {
    setCommitMessage(argv.setMessage)
    process.exit(0)
}

// Set commit delay
if (argv.setDelay) {
    setCommitDelay(argv.setDelay)
    process.exit(0)
}

if (argv.reset) {
    resetConfig()
    process.exit(0)
}

// Load config file
const { commitMessage, commitDelay } = loadConfig()
let timeout

// Auto commit function
const commitChanges = () => {
    const timestamp = getTime()
    console.log(`${commitDelay / 60000} minute(s) of inactivity detected...`.gray)

    exec('git add .', (addErr) => {
        if (addErr) {
            console.error('Failed to add changes:'.red, addErr)
            return
        }

        exec('git diff --cached --quiet', (diffErr) => {
            if (diffErr) {
                exec(`git commit -m '${commitMessage} @ ${timestamp}'`, (commitErr) => {
                    if (commitErr) {
                        console.error('Commit failed:'.red, commitErr)
                    } else {
                        console.log(`✅ Auto-committed: '${commitMessage} @ ${timestamp}'`.green)
                    }
                })
            } else {
                console.log('No changes to commit.'.grey)
            }
        })
    })
}

const getTime = () => {
    const now = new Date()
    let hours = now.getHours()
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 // Convert to 12-hour format
    hours = hours ? hours : 12 // The hour '0' should be '12'
    return `${hours}:${minutes}:${seconds} ${ampm}`
}

// Debounce function to prevent unnecessary commits
const debounceCommit = () => {
    clearTimeout(timeout)
    timeout = setTimeout(commitChanges, commitDelay)
}

// Watch all file changes
const watcher = chokidar.watch('.', {
    ignored: [/node_modules/, /(^|[\/\\])\..+/],
    ignoreInitial: true,
    persistent: true,
})

watcher.on('all', (event, path) => {
    console.log(`File changed: ${path}`.grey)
    debounceCommit()
})

console.log(`👀 Watching for changes... Auto-commit will use '${commitMessage}' after ${commitDelay / 60000} minute(s) of inactivity.`.grey)
