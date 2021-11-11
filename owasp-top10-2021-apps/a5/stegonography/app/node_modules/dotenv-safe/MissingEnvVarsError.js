'use strict';

const util = require('util');

function MissingEnvVarsError (allowEmptyValues, dotenvFilename, exampleFilename, missingVars, error) {
    const errorMessage = `The following variables were defined in ${exampleFilename} but are not present in the environment:\n  ${missingVars.join(', ')}
Make sure to add them to ${dotenvFilename} or directly to the environment.`;
    const allowEmptyValuesMessage = !allowEmptyValues ? `If you expect any of these variables to be empty, you can use the allowEmptyValues option:
require('dotenv-safe').config({
  allowEmptyValues: true
});` : '';
    const envErrorMessage = error ? `Also, the following error was thrown when trying to read variables from  ${dotenvFilename}:\n${error.message}` : '';
    Error.call(this);
    this.name = this.constructor.name;
    this.missing = missingVars;
    this.example = this.sample = exampleFilename;
    this.message = [errorMessage, allowEmptyValuesMessage, envErrorMessage]
        .filter(Boolean)
        .join('\n\n');
    Error.captureStackTrace(this, this.constructor);
}

util.inherits(MissingEnvVarsError, Error);
module.exports = MissingEnvVarsError;
