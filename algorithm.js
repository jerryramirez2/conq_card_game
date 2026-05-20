let val = [0, 1, 3, 3, 5, 10, 10, 11];
let typ = ['S', 'C', 'D', 'C', 'H', 'S', 'S', 'C'];
let matches = [];
let array = [];
let github_test;

let count = 0;
for (let i = 0; i < val.length; i++) {
    if (count == 0) {
        matches.push(`${val[i]}-${typ[i]}`);
    }

    if ( (i != (val.length - 1)) && (val[i] == val[i + 1]) ) {
        matches.push(`${val[i]}-${typ[i + 1]}`);
        count++;
    }
    else {
        if (count > 0) {
            array.push(matches);
        }
        count = 0;
        matches = [];
    }

    if (count > 0) {
        console.log(`Num: ${val[i]} | count = ${count}`);
    }
}

console.log(array);
