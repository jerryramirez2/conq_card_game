let currValue = 1;
let currType = 'C';

let sortedArray = [
    ['6-D', '6-H'],
    ['11-C', '11-D', '11-H']
];

let optionArray = [];

function getOppSeqPlay(currValue, currType, sortedArray, optionArray) {

    for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray.length > 1) {
            let card = sortedArray[i][0].split("-");
            let val = card[0];

            if (currValue == val) {
                sortedArray[i].push(`${currValue}-${currType}`);
            }
        }
        if (sortedArray[i].length > 2) {
            optionArray.push(sortedArray[i]);
        }
    }

    return optionArray;
}

optionArray = checkOppGame(currValue, currType, sortedArray, optionArray)
console.log(optionArray);
