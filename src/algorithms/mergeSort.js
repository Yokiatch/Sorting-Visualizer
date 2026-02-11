export const getMergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array.slice(), 0, array.length - 1, auxiliaryArray, animations);
  
  // Mark all as sorted
  for (let i = 0; i < array.length; i++) {
    animations.push({ type: 'sorted', indices: [i] });
 }
  return animations;
};

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // Compare
    animations.push({ type: 'compare', indices: [i, j] });
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Overwrite value at k with value from i
      animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[i]] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Overwrite value at k with value from j
      animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[j]] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[i]] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[j]] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}