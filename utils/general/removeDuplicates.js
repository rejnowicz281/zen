export default function removeDuplicates(array) {
    const arr = array;

    for (let i = 0; i < arr.length; ) {
        const userId = arr[i].id;
        if (i !== arr.lastIndexOf(arr.find((arr) => arr.id === userId))) {
            arr.splice(i, 1);
        } else {
            i++;
        }
    }

    return arr;
}
