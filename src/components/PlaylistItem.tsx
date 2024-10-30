import React from 'react';
import { Play } from 'lucide-react';
import { Song } from '../types/song';
import { formatTime } from '../utils/formatTime';

interface PlaylistItemProps {
  song: Song;
  isActive: boolean;
  onSelect: (song: Song) => void;
}

export default function PlaylistItem({ song, isActive, onSelect }: PlaylistItemProps) {
  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 
        ${isActive ? 'bg-gray-50' : ''}`}
      onClick={() => onSelect(song)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
          <img 
            src={song.cover} 
            alt={song.title} 
            className="w-full h-full object-cover"
          />
          {isActive && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </div>
        <div>
          <h3 className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
            {song.title}
          </h3>
          <p className="text-xs text-gray-500">{song.artist}</p>
        </div>
      </div>
      <span className="text-xs text-gray-500">{formatTime(song.duration)}</span>
    </div>
  );
}