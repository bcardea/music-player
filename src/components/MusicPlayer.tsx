import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Loader } from 'lucide-react';
import { Song, playlist } from '../types/song';
import PlaylistItem from './PlaylistItem';
import { formatTime } from '../utils/formatTime';

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const animationRef = useRef<number>();

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      if (isPlaying) audio.play();
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => playNext();
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentSong.audioUrl;
    audio.load();
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[previousIndex]);
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="text-center">
        <span className="text-lg font-medium">Now Playing</span>
      </div>

      <div className="flex justify-center">
        <div className="relative w-64 h-64">
          <div 
            className={`absolute inset-0 rounded-full overflow-hidden ${isPlaying && !isLoading ? 'animate-spin-slow' : ''}`}
          >
            <img
              src={currentSong.cover}
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-[40%] bg-white rounded-full"></div>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{currentSong.title}</h2>
        <p className="text-gray-500">{currentSong.artist} • {currentSong.album}</p>
      </div>

      <div className="space-y-2">
        <div className="h-1 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gray-800 rounded-full transition-all duration-100"
            style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-8">
        <SkipBack 
          className="w-6 h-6 text-gray-600 cursor-pointer" 
          onClick={playPrevious}
        />
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>
        <SkipForward 
          className="w-6 h-6 text-gray-600 cursor-pointer"
          onClick={playNext}
        />
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Up Next</h3>
        {playlist.map((song) => (
          <PlaylistItem
            key={song.id}
            song={song}
            isActive={currentSong.id === song.id}
            onSelect={handleSongSelect}
          />
        ))}
      </div>
    </div>
  );
}