

**Simple Node Js library for easy cli deployment**

v1

Install needed dependencies:

    npm i chalk cfonts

**Initializing CLI**

```javascript
const CLI = require('./Cli.js');

CLI.init({
  prompt: '$ ', ///must be string
})
```

**Init( [object] ) methord:**
 
 Available parametres: 
 
   prompt [required]: (String) Initial Prompt symbol
   
   smallText: (String) Initial text string before cli
   
   hugeText: (Obj) 
   
       {
           font: 'block',              // define the font face
           align: 'left',              // define text alignment
           colors: ['system'],         // define all colors
           background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
           letterSpacing: 1,           // define letter spacing
           lineHeight: 1,              // define the line height
           space: true,                // define if the output text should have empty lines on top and on the bottom
           maxLength: '0',  
       } 
   *examples can be found in: https://www.npmjs.com/package/cfonts
   
   
**addProcess([String], [Object])**

String: input excepted by cly string

Object: 

    {
        description: 'Prints out hello world' //For --help
        output: [String || Function] 'Hello world' // What is outputed to cli 
    }
    
* Note: Description must return String