/* eslint-env commonjs */
const avasuroEslint = require('eslint-config-avasuro');
const {INDENT, QUOTES, PLUGINS} = require('eslint-config-avasuro/constants');

module.exports = {
    extends: [
        avasuroEslint({
            config: {
                indent: INDENT.SPACES_4,
                quotes: QUOTES.SINGLE
            },
            plugins: [
                PLUGINS.CORE,
                PLUGINS.REACT,
                PLUGINS.TYPESCRIPT
            ]
        })
    ],
    env: {
        browser: true
    }
};
