let array = [10, 9, 8, 5, 6, 12];

for (let i = 0; i < array.length; i++) {
    let currMin = array[i];
    let index = i;
    for (let j = i; j < array.length; j++) {
        if (array[j] < currMin) {
            currMin = array[j];
            index = j;
        }
    }
    let temp = array[i];
    array[i] = currMin;
    array[index] = temp;
}

console.log(array);
