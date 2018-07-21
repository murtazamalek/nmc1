/**
 * Configuration file to store the environment variables
 */

// Define the environment object
var environments = {};

// Configure the parameters for the staging server
environments.staging = {
    'httpPort': 2000,
    'envName' : 'Home Assignment #1 - Staging'
}

// Get current environment value and if not
// available then pick stagin by default
var currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

// Select the environment to export
var envToExport = environments[currentEnvironment] == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the environment variables
module.exports = envToExport;