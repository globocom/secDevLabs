'use strict';

const dotenv = require('dotenv');
const fs = require('fs');
const MissingEnvVarsError = require('./MissingEnvVarsError.js');

function difference (arrA, arrB) {
    return arrA.filter(a => arrB.indexOf(a) < 0);
}

function compact (obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (obj[key]) {
            result[key] = obj[key];
        }
    });
    return result;
}

module.exports = {
    config: function(options = {}) {
        const dotenvResult = dotenv.load(options);
        const example = options.example || options.sample || '.env.example';
        const allowEmptyValues = options.allowEmptyValues || false;
        const processEnv = allowEmptyValues ? process.env : compact(process.env);
        const exampleVars = dotenv.parse(fs.readFileSync(example));
        const missing = difference(Object.keys(exampleVars), Object.keys(processEnv));

        if (missing.length > 0) {
            throw new MissingEnvVarsError(allowEmptyValues, options.path || '.env', example, missing, dotenvResult.error);
        }

        // Key/value pairs defined in example file and resolved from environment
        const required = Object.keys(exampleVars).reduce((acc, key) => {
            acc[key] = process.env[key];
            return acc;
        }, {});
        const error = dotenvResult.error ? { error: dotenvResult.error } : {};
        const result = {
            parsed: dotenvResult.error ? {} : dotenvResult.parsed,
            required: required
        };
        return Object.assign(result, error);
    },
    parse: dotenv.parse,
    MissingEnvVarsError: MissingEnvVarsError
};

module.exports.load = module.exports.config;
module.exports.MissingEnvVarsError = MissingEnvVarsError;
