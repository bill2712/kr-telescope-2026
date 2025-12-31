
import React from 'react';

const Planner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full bg-space-black text-white pt-24">
      <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fas fa-satellite-dish text-4xl text-blue-400"></i>
      </div>
      <h2 className="text-3xl font-bold mb-4">Stargazing Planner</h2>
      <p className="max-w-md text-gray-400 mb-8">
        Check weather conditions, light pollution, and best viewing times for tonight.
        (Feature coming soon with HKO Integration)
      </p>
      
      <div className="w-full max-w-sm bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Viewing Condition</span>
            <span className="text-green-400 font-bold">Good</span>
        </div>
        <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Cloud Coverage</span>
            <span className="text-white font-bold">15%</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-gray-400">Moon Phase</span>
            <span className="text-yellow-400 font-bold">Full Moon</span>
        </div>
      </div>
    </div>
  );
};

export default Planner;
