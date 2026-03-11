"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video, Upload, Folder, Search, Grid, List } from "lucide-react";

const demoMedia = [
  { id: "1", name: "summer-launch-banner.jpg", type: "image", size: "2.4 MB", date: "Mar 10, 2026", used: 3 },
  { id: "2", name: "product-demo.mp4", type: "video", size: "48 MB", date: "Mar 9, 2026", used: 1 },
  { id: "3", name: "brand-story-reel.mp4", type: "video", size: "22 MB", date: "Mar 8, 2026", used: 5 },
  { id: "4", name: "team-photo.png", type: "image", size: "1.8 MB", date: "Mar 7, 2026", used: 2 },
  { id: "5", name: "infographic-q1.png", type: "image", size: "3.2 MB", date: "Mar 5, 2026", used: 7 },
  { id: "6", name: "podcast-trailer.mp4", type: "video", size: "15 MB", date: "Mar 3, 2026", used: 1 },
  { id: "7", name: "logo-dark.svg", type: "image", size: "12 KB", date: "Mar 1, 2026", used: 12 },
  { id: "8", name: "testimonial-video.mp4", type: "video", size: "35 MB", date: "Feb 28, 2026", used: 4 },
];

export function MediaSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <div className="flex gap-2">
          <Button><Upload className="mr-2 h-4 w-4" /> Upload</Button>
          <Button variant="outline"><Folder className="mr-2 h-4 w-4" /> New Folder</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Files</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{demoMedia.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Images</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{demoMedia.filter(m => m.type === 'image').length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Videos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{demoMedia.filter(m => m.type === 'video').length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Storage Used</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">127 MB</div><p className="text-xs text-muted-foreground">of 5 GB (Free plan)</p></CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 p-3 rounded-lg border bg-background">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search media files..." className="flex-1 bg-transparent outline-none text-sm" />
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Grid className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><List className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {demoMedia.map((file) => (
          <Card key={file.id} className="cursor-pointer hover:shadow-lg transition-all hover:border-violet-500/50 group">
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
              {file.type === 'image' ? (
                <ImageIcon className="h-10 w-10 text-zinc-500 group-hover:text-violet-400 transition-colors" />
              ) : (
                <Video className="h-10 w-10 text-zinc-500 group-hover:text-violet-400 transition-colors" />
              )}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs bg-black/60 text-white">
                {file.type}
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{file.size}</span>
                <span>Used in {file.used} posts</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
