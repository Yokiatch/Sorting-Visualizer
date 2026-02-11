import React, { useState, useEffect, useRef } from 'react';
import Controls from './components/Controls';
import { getBubbleSortAnimations } from './algorithms/bubbleSort';
import { getQuickSortAnimations } from './algorithms/quickSort';
import { getMergeSortAnimations } from './algorithms/mergeSort';
import { getHeapSortAnimations } from './algorithms/heapSort';
import { ALGO_INFO } from './data/algorithmInfo';

const SortingVisualizer = () => {
  // --- State ---
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble');
  const [size, setSize] = useState(20); // Default smaller size so numbers are readable
  const [speed, setSpeed] = useState(50); 
  const [isSorting, setIsSorting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBars, setActiveBars] = useState([]); 
  const [sortedIndices, setSortedIndices] = useState([]);
  const [showNumbers, setShowNumbers] = useState(true); // Default to true
  
  // --- Refs ---
  const arrayRef = useRef([]); 
  const timeoutsRef = useRef([]); 
  const animationsRef = useRef([]); 
  const currentStepRef = useRef(0); 

  // --- Initialization ---
  useEffect(() => {
    generateArray();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    generateArray();
    // eslint-disable-next-line
  }, [size]);

  // --- Logic ---
  const generateArray = () => {
    stopSorting();
    // Generate numbers between 10 and 100 for cleaner UI when showing numbers
    const newArray = Array.from({ length: size }, () => randomIntFromInterval(10, 100));
    setArray(newArray);
    arrayRef.current = newArray;
    setSortedIndices([]);
    setActiveBars([]);
    currentStepRef.current = 0;
  };

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const stopSorting = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsSorting(false);
    setIsPlaying(false);
    setActiveBars([]);
  };

  const startSorting = () => {
    if (isSorting && isPlaying) {
        setIsPlaying(false);
        timeoutsRef.current.forEach(clearTimeout);
        return;
    }
    if (isSorting && !isPlaying) {
        setIsPlaying(true);
        animate(animationsRef.current);
        return;
    }

    setIsSorting(true);
    setIsPlaying(true);
    setSortedIndices([]);
    
    let animations = [];
    switch (algorithm) {
      case 'Bubble': animations = getBubbleSortAnimations(array); break;
      case 'Quick': animations = getQuickSortAnimations(array); break;
      case 'Merge': animations = getMergeSortAnimations(array); break;
      case 'Heap': animations = getHeapSortAnimations(array); break;
      default: break;
    }
    
    animationsRef.current = animations;
    animate(animations);
  };

  const animate = (animations) => {
    const totalSteps = animations.length;
    
    const loop = () => {
        if (currentStepRef.current >= totalSteps) {
            setIsSorting(false);
            setIsPlaying(false);
            return;
        }

        const step = animations[currentStepRef.current];
        const { type, indices } = step;

        if (type === 'compare') {
            setActiveBars(indices);
        } else if (type === 'swap') {
            const [i, j] = indices;
            setArray((prev) => {
                const newArr = [...prev];
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                return newArr;
            });
            setActiveBars(indices);
        } else if (type === 'overwrite') {
            const [index, newVal] = indices;
            setArray((prev) => {
                const newArr = [...prev];
                newArr[index] = newVal;
                return newArr;
            });
            setActiveBars([index]);
        } else if (type === 'sorted') {
             setSortedIndices((prev) => [...prev, ...indices]);
             setActiveBars([]);
        }

        currentStepRef.current++;
        const timeoutId = setTimeout(loop, speed);
        timeoutsRef.current.push(timeoutId);
    };

    loop();
  };

  const getBarColor = (index) => {
    if (sortedIndices.includes(index)) return 'bg-emerald-400 shadow-[0_0_10px_#34d399]';
    if (activeBars.includes(index)) return 'bg-yellow-400 scale-105 z-10 shadow-[0_0_15px_#facc15]';
    return 'bg-cyan-500 hover:bg-cyan-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center pt-8 px-4 overflow-hidden">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">
        Sorting Visualizer
      </h1>

      <Controls 
        handleGenerate={generateArray}
        handleSort={startSorting}
        handleSpeed={setSpeed}
        handleSize={setSize}
        isPlaying={isPlaying}
        isSorting={isSorting}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        speed={speed}
        size={size}
        showNumbers={showNumbers}
        setShowNumbers={setShowNumbers}
      />

      {/* Visualization Area */}
      <div className="flex items-end justify-center w-full max-w-6xl h-[50vh] bg-slate-800/50 rounded-xl p-4 border border-slate-700 shadow-2xl mb-6 relative">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`relative flex items-end justify-center mx-px rounded-t-sm transition-all duration-75 ${getBarColor(idx)}`}
            style={{ 
                height: `${value}%`, // Assumes values are 0-100
                width: `${100/size}%`
            }}
          >
            {/* Array Values */}
            {showNumbers && (
                <span 
                    className={`absolute bottom-2 text-slate-900 font-bold select-none
                        ${size > 25 ? 'text-[8px] rotate-90' : 'text-xs'}`}
                >
                    {value}
                </span>
            )}
          </div>
        ))}
      </div>

      {/* Info Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl pb-10">
         <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{ALGO_INFO[algorithm].name}</h2>
            <p className="text-slate-400 text-sm">{ALGO_INFO[algorithm].desc}</p>
         </div>
         <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-indigo-500 shadow-lg grid grid-cols-2 gap-4">
            <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold">Time (Avg)</span>
                <p className="text-lg font-mono text-emerald-400">{ALGO_INFO[algorithm].avg}</p>
            </div>
            <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold">Time (Worst)</span>
                <p className="text-lg font-mono text-red-400">{ALGO_INFO[algorithm].worst}</p>
            </div>
            <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold">Time (Best)</span>
                <p className="text-lg font-mono text-blue-400">{ALGO_INFO[algorithm].best}</p>
            </div>
            <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold">Space</span>
                <p className="text-lg font-mono text-purple-400">{ALGO_INFO[algorithm].space}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;