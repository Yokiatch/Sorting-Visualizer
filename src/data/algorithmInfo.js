export const ALGO_INFO = {
  Bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    desc: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
  },
  Quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    desc: "Selects a 'pivot' element and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot."
  },
  Merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    desc: "Divide and conquer. Divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves."
  },
  Heap: {
    name: "Heap Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    desc: "Converts the array into a Binary Heap structure, then repeatedly extracts the maximum element and moves it to the sorted region."
  }
};