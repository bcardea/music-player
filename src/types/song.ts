export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
}

export const playlist: Song[] = [
  {
    id: 1,
    title: "Ocean Waves",
    artist: "Nature Sounds",
    album: "Peaceful Moments",
    duration: 135,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
  },
  {
    id: 2,
    title: "Mountain Breeze",
    artist: "Nature Sounds",
    album: "Peaceful Moments",
    duration: 142,
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3"
  },
  {
    id: 3,
    title: "Forest Rain",
    artist: "Nature Sounds",
    album: "Peaceful Moments",
    duration: 128,
    cover: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&auto=format&fit=crop&q=60",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-spirit-of-nature-614.mp3"
  }
];