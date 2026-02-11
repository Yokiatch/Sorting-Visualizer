export const getBubbleSortAnimations = (array) => {
  const animations = [];
  const auxiliaryArray = array.slice();
  const n = auxiliaryArray.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // 1. Compare
      animations.push({ type: 'compare', indices: [j, j + 1] });

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        // 2. Swap
        animations.push({ type: 'swap', indices: [j, j + 1] });
        let temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      }
    }
    // 3. Mark as Sorted (Final position for this element)
    animations.push({ type: 'sorted', indices: [n - 1 - i] });
  }
  // Mark the first element as sorted at the end
  animations.push({ type: 'sorted', indices: [0] });
  
  return animations;
};