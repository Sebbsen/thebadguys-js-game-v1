export const containsArray = (parentArray, subArray) => {
    return parentArray.some(arr =>
      arr.length === subArray.length && arr.every((value, index) => value === subArray[index])
    );
}