const READLINE = require('readline');
const EVENTS = require('events');
const CHALK = require('chalk');
const CFONTS = require('cfonts');

class MYEVENTS extends EVENTS {}

const MYEVENT = new MYEVENTS();


const CLI = {

    MAP: new Map(),

    startText({font, align, colors, background, letterSpacing, lineHeight, space, text}) {
        CFONTS.say(text.trim(), {
            font: font ? font : null,
            align: align ? align : null,
            colors: colors ? colors : null,
            background: background ? background : null,
            letterSpacing: letterSpacing ? letterSpacing : null,
            lineHeight: lineHeight ? lineHeight : null,
            space: space ? space : null,
        })
    },

    addProcess(input, config) {
        if (typeof config.output === 'string' || typeof config.output === 'number' || typeof config.output === 'boolean' || typeof config.output === 'function') {
            return this.MAP.set(input, config);
        } else {
            console.log(typeof config.output);
            throw new Error('Wrong output type');
        }
    },

    proccessInputs(input, config) {
        input = typeof input === 'string' && input.trim().length > 0 ? input.trim() : false;
        if(input) {

            if( ( this.MAP.has('--help') || this.MAP.has('help') ) && input === '--help') {
                let result = '<<< All commands:     Description\n';
                this.MAP.forEach((val, key) => result += `    ${key}             ${val.description}\n`);
                MYEVENT.emit('message', result);
                return;
            }

            if(this.MAP.has(input)) {

                this.MAP.forEach( async (val, key) => {
                    if(key === input) {

                        if (typeof val.output === 'string' || typeof val.output === 'number' || typeof val.output === 'boolean')  {
                            MYEVENT.emit('message', val);
                            return;
                        }

                        if(typeof val.output === 'function')   {
                            let resutl = await val.output(input);
                            MYEVENT.emit('message', resutl);
                            return;
                        }



                    }
                })

            } else config.emptyText ? console.log(config.emptyText) : console.log('This command is not available');

        }
    },

    init(config) {

        if(!config) throw new Error('No initial parameters');

        if(config.hugeText) this.startText(config.hugeText);
        if(config.smallText) console.log(config.smallText);

        const RINIT = READLINE.createInterface({
            prompt: config.prompt && typeof config.prompt === 'string' ? config.prompt : '> ',
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        RINIT.prompt();

        RINIT.on('line', input => this.proccessInputs(input, config));

        MYEVENT.on('message', msg => {
            console.log(msg);
            RINIT.prompt();
        });

        RINIT.on('close', () => process.exit(0))
    }

};


module.exports = CLI;
