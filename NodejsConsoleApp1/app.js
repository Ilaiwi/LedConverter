fs = require('fs')
fileNumber = 3;
fs.readFile(`animations/${fileNumber}.txt`, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let leds = data.split(';');
    let output = "";
    for (let i = 0; i < 100; i++) {
        const led = leds[i];
        const numberPattern = /\d+/g;
        const numbers = led.match(numberPattern);
        if (numbers) {
            const colIndex = numbers[0] % 10;
            const rowIndex = parseInt(numbers[0] / 10);
            const r = parseInt(numbers[1] / 16);
            const g = parseInt(numbers[2] / 16);
            const b = parseInt(numbers[3] / 16);
            let str;
            if (i == 99) 
                str = `\LED(${rowIndex},${colIndex},${r},${g},${b}\);`;
            else
                str = `\LED(${rowIndex},${colIndex},${r},${g},${b}\);\n`;
            output= output.concat([str]);
        }
    }
    fs.writeFile(`animations/${fileNumber}output.txt`, output, () => { console.log("done") });
    
});