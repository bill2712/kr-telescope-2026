import React from 'react';
import { translations } from '../utils/i18n';

type Translations = typeof translations['en'];

interface MapToolsProps {
    viewMode: 'stereo' | 'ortho';
    onSetViewMode: (mode: 'stereo' | 'ortho') => void;
    enableGyro: boolean;
    onToggleGyro: () => void;
    onLocationUpdate: () => void;
    showArt: boolean;
    onToggleArt: () => void;
    onCameraClick: () => void;
    t: Translations;
}

const MapTools: React.FC<MapToolsProps> = ({
    viewMode,
    onSetViewMode,
    enableGyro,
    onToggleGyro,
    onLocationUpdate,
    showArt,
    onToggleArt,
    onCameraClick,
    t
}) => {
    return (
        <div className="absolute bottom-24 right-4 flex flex-col gap-3 z-40 pointer-events-auto">
            
            {/* View Mode Toggle */}
            <div className="bg-[#161825]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 flex flex-col gap-1 shadow-xl">
                 <button
                    onClick={() => onSetViewMode('stereo')}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        viewMode === 'stereo' 
                        ? 'bg-kidrise-orange text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title="2D Map"
                >
                    <i className="fas fa-map text-lg"></i>
                </button>
                <div className="w-8 h-[1px] bg-white/10 mx-auto"></div>
                <button
                    onClick={() => onSetViewMode('ortho')}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        viewMode === 'ortho' 
                        ? 'bg-kidrise-orange text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title="3D Globe"
                >
                    <i className="fas fa-globe text-lg"></i>
                </button>
            </div>

            {/* Other Tools Group */}
            <div className="flex flex-col gap-3">
                 {/* Camera / Postcard */}
                 <button
                    onClick={onCameraClick}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 border border-white/20 text-white flex items-center justify-center transition-all shadow-xl active:scale-95"
                    title={t.btnCamera}
                >
                    <i className="fas fa-camera text-xl"></i>
                </button>

                 {/* Art Toggle */}
                 <button
                    onClick={onToggleArt}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all shadow-xl active:scale-95
                    ${showArt ? 'bg-purple-600 border-purple-400 text-white' : 'bg-[#161825]/90 border-white/20 text-gray-400 hover:text-white'}`}
                    title={t.btnArt}
                >
                    <i className="fas fa-star text-xl"></i>
                </button>

                 {/* Gyro */}
                 <button
                    onClick={onToggleGyro}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all shadow-xl active:scale-95
                    ${enableGyro ? 'bg-red-500 border-red-400 text-white animate-pulse' : 'bg-[#161825]/90 border-white/20 text-gray-400 hover:text-white'}`}
                     title={t.btnGyro}
                >
                    <i className="fas fa-mobile-alt text-xl"></i>
                </button>

                {/* Location */}
                <button
                    onClick={onLocationUpdate}
                    className="w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white flex items-center justify-center transition-all shadow-xl shadow-blue-500/30 active:scale-95"
                     title={t.btnUpdateLoc}
                >
                    <i className="fas fa-location-arrow text-xl"></i>
                </button>
            </div>

        </div>
    );
};

export default MapTools;
