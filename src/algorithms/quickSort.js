export const getQuickSortAnimations = (array) => {
  const animations = [];
  const auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  
  // Mark all as sorted at the end just to be sure
  for (let i = 0; i < auxiliaryArray.length; i++) {
     animations.push({ type: 'sorted', indices: [i] });
  }
  return animations;
};

function quickSortHelper(arr, start, end, animations) {
  if (start >= end) return;
  const pivotIndex = partition(arr, start, end, animations);
  quickSortHelper(arr, start, pivotIndex - 1, animations);
  quickSortHelper(arr, pivotIndex + 1, end, animations);
}

function partition(arr, start, end, animations) {
  // Using last element as pivot
  const pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    animations.push({ type: 'compare', indices: [i, end] });
    
    if (arr[i] < pivotValue) {
      animations.push({ type: 'swap', indices: [i, pivotIndex] });
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
    }
  }
  
  animations.push({ type: 'swap', indices: [pivotIndex, end] });
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  
  return pivotIndex;
}