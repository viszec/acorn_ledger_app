const semver = require('semver');
const { engines } = require('../package.json');

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
    console.error(`Required node version ${version} not satisfied with current version ${process.version}.`);
    process.exit(1);
}

// Check npm version
const npmVersion = engines.npm;
const { execSync } = require('child_process');
const currentNpmVersion = execSync('npm -v').toString().trim();

if (!semver.satisfies(currentNpmVersion, npmVersion)) {
    console.error(`Required npm version ${npmVersion} not satisfied with current version ${currentNpmVersion}.`);
    process.exit(1);
}