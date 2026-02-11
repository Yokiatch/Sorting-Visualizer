export const getHeapSortAnimations = (array) => {
  const animations = [];
  const auxiliaryArray = array.slice();
  const n = auxiliaryArray.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(auxiliaryArray, n, i, animations);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'swap', indices: [0, i] });
    [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];
    
    animations.push({ type: 'sorted', indices: [i] });
    heapify(auxiliaryArray, i, 0, animations);
  }
  animations.push({ type: 'sorted', indices: [0] });
  
  return animations;
};

function heapify(arr, n, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n) {
      animations.push({ type: 'compare', indices: [left, largest] });
      if (arr[left] > arr[largest]) largest = left;
  }

  if (right < n) {
      animations.push({ type: 'compare', indices: [right, largest] });
      if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    animations.push({ type: 'swap', indices: [i, largest] });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}