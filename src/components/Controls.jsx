import React from 'react';

const Controls = ({ 
  handleGenerate, 
  handleSort, 
  handleSpeed, 
  handleSize, 
  isPlaying, 
  isSorting, 
  algorithm, 
  setAlgorithm, 
  speed, 
  size,
  showNumbers,      // New Prop
  setShowNumbers    // New Prop
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-slate-800 rounded-lg shadow-lg items-center justify-between w-full max-w-5xl mx-auto mb-6 border border-slate-700">
      
      {/* Algorithms Selection */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {['Bubble', 'Quick', 'Merge', 'Heap'].map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            disabled={isSorting}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all 
              ${algorithm === algo 
                ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-50'}`}
          >
            {algo}
          </button>
        ))}
      </div>

      {/* Sliders & Toggles */}
      <div className="flex gap-6 items-center flex-1 w-full md:w-auto justify-center">
        
        {/* Speed Slider */}
        <div className="flex flex-col w-24">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Speed</label>
          <input
            type="range"
            min="1"
            max="100"
            value={101 - speed}
            onChange={(e) => handleSpeed(101 - Number(e.target.value))}
            disabled={isSorting}
            className="accent-cyan-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Size Slider */}
        <div className="flex flex-col w-24">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Size: {size}</label>
          <input
            type="range"
            min="5"
            max="50" // Cap at 50 for readability of numbers
            value={size}
            onChange={(e) => handleSize(Number(e.target.value))}
            disabled={isSorting}
            className="accent-cyan-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Show Values Toggle */}
        <div className="flex flex-col items-center justify-center">
           <label className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Values</label>
           <div 
             onClick={() => !isSorting && setShowNumbers(!showNumbers)}
             className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer transition-colors ${showNumbers ? 'bg-cyan-500' : 'bg-slate-600'} ${isSorting ? 'opacity-50 cursor-not-allowed' : ''}`}
           >
              <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${showNumbers ? 'translate-x-5' : 'translate-x-0'}`}></div>
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={isSorting}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-bold text-white text-sm transition-colors disabled:opacity-50 shadow-lg shadow-indigo-500/20"
        >
          Reset
        </button>
        <button
          onClick={handleSort}
          className={`px-6 py-2 rounded-md font-bold text-white text-sm transition-all shadow-lg
            ${isPlaying 
              ? 'bg-red-500 hover:bg-red-400 shadow-red-500/20' 
              : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'}`}
        >
          {isPlaying ? 'Pause' : isSorting ? 'Resume' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default Controls;