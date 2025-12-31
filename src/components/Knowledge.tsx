
import React from 'react';

const Knowledge: React.FC = () => {
    const topics = [
        { title: "Solar System", icon: "fa-sun", color: "text-yellow-400" },
        { title: "Constellations", icon: "fa-star", color: "text-blue-400" },
        { title: "Deep Sky Objects", icon: "fa-galaxie", color: "text-purple-400" }, // fa-meteor or similar
        { title: "Space History", icon: "fa-rocket", color: "text-red-400" },
    ];

  return (
    <div className="h-full overflow-y-auto pt-24 px-4 pb-32">
       <h2 className="text-3xl font-bold mb-6 text-center">Astronomy 101</h2>
       <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
           {topics.map((t, i) => (
               <div key={i} className="aspect-square bg-[#202336] rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform border border-white/5">
                   <i className={`fas ${t.icon} text-4xl ${t.color}`}></i>
                   <span className="font-bold text-lg">{t.title}</span>
               </div>
           ))}
       </div>
    </div>
  );
};

export default Knowledge;
