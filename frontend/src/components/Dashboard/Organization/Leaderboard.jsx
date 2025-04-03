// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import LeaderboardItem from './LeaderboardItem';
// import { cn } from '../../../utils/libs';
// import styles from "./CampaignDetails.module.css";

// const mockLeaderboardData = [
//   { id: 1, name: "KEVIN", score: 3870000 },
//   { id: 2, name: "ABRAHAM", score: 2540000 },
//   { id: 3, name: "JAMES", score: 2060000 },
//   { id: 4, name: "SARAH", score: 1970000 }
// ];

// const Leaderboard = ({ onClose, className }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [players, setPlayers] = useState(mockLeaderboardData);

//   useEffect(() => {
//     // Trigger animation after component mounts
//     setIsVisible(true);
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//     // Delay the actual close to allow animation to finish
//     setTimeout(() => {
//       if (onClose) onClose();
//     }, 300);
//   };

//   return (
//     <div className={cn(
//       "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300",
//       isVisible ? "opacity-100" : "opacity-0",
//       className
//     )}>
//       <div className="relative">
//         <div 
//           className={cn(
//             "leaderboard-container bg-leaderboard-background rounded-3xl p-6 transition-all duration-300",
//             isVisible ? "scale-100" : "scale-95"
//           )}
//         >
//           <div className="leader-title text-leaderboard-red text-4xl mb-4 animate-float">
//             LEADERBOARD
//           </div>
          
//           <div className="space-y-2 w-96">
//             {players.map((player, index) => (
//               <LeaderboardItem 
//                 key={player.id}
//                 rank={index + 1}
//                 name={player.name}
//                 score={player.score}
//               />
//             ))}
//           </div>
          
//           <button className="close-button" onClick={handleClose}>
//             <X size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import { X, Award, Trophy } from 'lucide-react';
import { Button } from '../../ui/button';


const leaderboardData = [
  { id: 1, name: 'KEVIN', score: 3870000, rank: 1 },
  { id: 2, name: 'ABRAHAM', score: 2540000, rank: 2 },
  { id: 3, name: 'JAMES', score: 2060000, rank: 3 },
  // { id: 4, name: 'SARAH', score: 1970000, rank: 4 },
];

const Leaderboard = () => {
  return (
    <div className="relative max-w-2xl mx-auto  transition-all duration-300 hover:scale-[1.01]">
      {/* Close button */}
      {/* <button className="absolute -right-3 -top-3 z-10 bg-red-600 rounded-full p-3 shadow-lg hover:bg-red-700 active:scale-95 transition-all">
        <X className="h-6 w-6 text-white" strokeWidth={3} />
      </button> */}
      
      {/* Leaderboard container */}
      <div className="bg-leaderboard-bg border-4 border-leaderboard-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -right-16 -top-16 h-32 w-32 bg-yellow-300 opacity-20 rounded-full"></div>
        <div className="absolute -left-16 -bottom-16 h-32 w-32 bg-yellow-300 opacity-20 rounded-full"></div>
        
        {/* Title */}
        <h1 className="text-red-600 text-6xl font-game mb-8 text-center tracking-wide uppercase animate-bounce-subtle"
            style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
          LEADERBOARD
        </h1>
        
        {/* Leaderboard items */}
        <div className="space-y-4">
          {leaderboardData.map((player, index) => (
            <div key={player.id} className="transform transition-all duration-300 hover:scale-[1.02]" 
                 style={{ animationDelay: `${index * 100}ms` }}>
              <LeaderboardItem 
                rank={player.rank} 
                name={player.name} 
                score={player.score} 
              />
            </div>
          ))}
        </div>
         {/* Cute buttons */}
         <div className="flex justify-center gap-4 mt-8">
          <button 
            className="bg-leaderboard-rank4 text-white px-6 py-3 rounded-full font-game tracking-wide flex items-center gap-2 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Trophy className="h-5 w-5" />
            <span>UPDATE TOP DONOR</span>
          </button>
          
          <button 
            className="bg-amber-500 text-white px-6 py-3 rounded-full font-game tracking-wide flex items-center gap-2 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Award className="h-5 w-5" />
            <span>AWARD TOP DONORS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
