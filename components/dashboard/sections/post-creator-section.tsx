"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus, Image as ImageIcon, Video, Type, Send, X, Calendar, Clock,
  Sparkles, Eye, ChevronDown, Loader2, Check, AlertCircle
} from "lucide-react";

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', emoji: '📸', color: '#E4405F', maxLen: 2200 },
  { id: 'x', name: 'X (Twitter)', emoji: '𝕏', color: '#000', maxLen: 280 },
  { id: 'facebook', name: 'Facebook', emoji: '📘', color: '#1877F2', maxLen: 63206 },
  { id: 'linkedin', name: 'LinkedIn', emoji: '💼', color: '#0077B5', maxLen: 3000 },
  { id: 'tiktok', name: 'TikTok', emoji: '🎵', color: '#010101', maxLen: 2200 },
  { id: 'youtube', name: 'YouTube', emoji: '▶️', color: '#FF0000', maxLen: 5000 },
  { id: 'discord', name: 'Discord', emoji: '🎮', color: '#5865F2', maxLen: 2000 },
  { id: 'telegram', name: 'Telegram', emoji: '✈️', color: '#26A5E4', maxLen: 4096 },
  { id: 'threads', name: 'Threads', emoji: '🧵', color: '#000', maxLen: 500 },
  { id: 'reddit', name: 'Reddit', emoji: '🟠', color: '#FF4500', maxLen: 40000 },
  { id: 'pinterest', name: 'Pinterest', emoji: '📌', color: '#BD081C', maxLen: 500 },
  { id: 'bluesky', name: 'Bluesky', emoji: '🦋', color: '#0085FF', maxLen: 300 },
];

export function PostCreatorSection() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'text' | 'image' | 'video' | 'carousel'>('text');
  const [scheduleType, setScheduleType] = useState<'now' | 'schedule' | 'optimal'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const minMaxLen = selectedPlatforms.length > 0
    ? Math.min(...selectedPlatforms.map(id => PLATFORMS.find(p => p.id === id)?.maxLen || 280))
    : 280;

  const charPercentage = Math.min((content.length / minMaxLen) * 100, 100);
  const isOverLimit = content.length > minMaxLen;

  const generateWithAI = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setContent("🚀 Exciting update! We've been working on something special behind the scenes, and we can't wait to share it with you.\n\nStay tuned for the big reveal this week! 👀✨\n\nWhat would you like to see? Drop your thoughts below! 👇\n\n#CreatorLife #BigAnnouncement #StayTuned");
    setIsGenerating(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handlePublish = () => {
    alert(`Post ${scheduleType === 'now' ? 'published' : 'scheduled'} to ${selectedPlatforms.join(', ')}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Create Post</h2>
          <p className="text-sm text-muted-foreground">Compose and publish to multiple platforms at once</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Platform Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Select Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      selectedPlatforms.includes(p.id)
                        ? 'text-white border-transparent shadow-md'
                        : 'border-muted-foreground/20 hover:border-muted-foreground/40'
                    }`}
                    style={selectedPlatforms.includes(p.id) ? { backgroundColor: p.color } : {}}
                  >
                    <span>{p.emoji}</span>
                    {p.name}
                    {selectedPlatforms.includes(p.id) && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Content</CardTitle>
                <Button variant="outline" size="sm" className="text-xs gap-1" onClick={generateWithAI} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                  AI Generate
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="What's on your mind? Write your post here..."
                className="w-full h-40 p-3 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setMediaType('image')} className={`p-2 rounded-lg ${mediaType === 'image' ? 'bg-violet-500/20 text-violet-500' : 'hover:bg-muted'}`}><ImageIcon className="h-4 w-4" /></button>
                  <button onClick={() => setMediaType('video')} className={`p-2 rounded-lg ${mediaType === 'video' ? 'bg-violet-500/20 text-violet-500' : 'hover:bg-muted'}`}><Video className="h-4 w-4" /></button>
                  <button onClick={() => setMediaType('text')} className={`p-2 rounded-lg ${mediaType === 'text' ? 'bg-violet-500/20 text-violet-500' : 'hover:bg-muted'}`}><Type className="h-4 w-4" /></button>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-20 h-1.5 rounded-full bg-muted overflow-hidden`}>
                    <div className={`h-full rounded-full transition-all ${isOverLimit ? 'bg-red-500' : charPercentage > 80 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${Math.min(charPercentage, 100)}%` }} />
                  </div>
                  <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {content.length}/{minMaxLen}
                  </span>
                  {isOverLimit && <AlertCircle className="h-3 w-3 text-red-500" />}
                </div>
              </div>

              {/* Media Upload Area */}
              {mediaType !== 'text' && (
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-violet-500/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    {mediaType === 'image' ? <ImageIcon className="h-8 w-8 text-muted-foreground" /> : <Video className="h-8 w-8 text-muted-foreground" />}
                    <p className="text-sm text-muted-foreground">Drag and drop {mediaType}s here, or click to browse</p>
                    <Button variant="outline" size="sm" className="text-xs">Choose Files</Button>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <label className="text-xs font-medium mb-1 block">Tags</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full flex items-center gap-1">
                      #{tag} <button onClick={() => setTags(prev => prev.filter(t => t !== tag))}><X className="h-2.5 w-2.5" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-1">
                  <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 px-3 py-1.5 text-xs rounded border bg-background" />
                  <Button variant="outline" size="sm" className="text-xs" onClick={addTag}>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Scheduling */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {[
                  { id: 'now' as const, label: 'Post Now', icon: Send, desc: 'Publish immediately' },
                  { id: 'schedule' as const, label: 'Schedule', icon: Calendar, desc: 'Pick a date & time' },
                  { id: 'optimal' as const, label: 'Optimal Time', icon: Sparkles, desc: 'AI picks the best time' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setScheduleType(opt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${scheduleType === opt.id ? 'border-violet-500 bg-violet-500/10' : 'hover:bg-muted'}`}
                  >
                    <opt.icon className="h-4 w-4" />
                    <div className="text-left">
                      <p className="text-xs font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              {scheduleType === 'schedule' && (
                <div className="space-y-2 pt-2">
                  <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full px-3 py-2 text-xs rounded border bg-background" />
                  <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="w-full px-3 py-2 text-xs rounded border bg-background" />
                </div>
              )}
              {scheduleType === 'optimal' && (
                <div className="p-3 bg-violet-500/10 rounded-lg">
                  <p className="text-xs text-violet-400">🤖 AI suggests: <strong>Tomorrow at 6:00 PM</strong></p>
                  <p className="text-xs text-muted-foreground mt-1">Based on your audience's peak activity times</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedPlatforms.length > 0 ? (
                  selectedPlatforms.slice(0, 1).map(platformId => {
                    const platform = PLATFORMS.find(p => p.id === platformId)!;
                    return (
                      <div key={platformId} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">CR</div>
                          <div>
                            <p className="text-xs font-medium">Crevo Creator</p>
                            <p className="text-xs text-muted-foreground">@crevo_official • {platform.name}</p>
                          </div>
                        </div>
                        <p className="text-xs whitespace-pre-wrap">{content || 'Your post preview will appear here...'}</p>
                        {tags.length > 0 && (
                          <p className="text-xs text-blue-500">{tags.map(t => `#${t}`).join(' ')}</p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">Select platforms to see preview</p>
                )}
                {selectedPlatforms.length > 1 && (
                  <p className="text-xs text-muted-foreground text-center">+{selectedPlatforms.length - 1} more {selectedPlatforms.length - 1 === 1 ? 'platform' : 'platforms'}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              disabled={!content.trim() || selectedPlatforms.length === 0 || isOverLimit}
              onClick={handlePublish}
            >
              <Send className="mr-2 h-4 w-4" />
              {scheduleType === 'now' ? 'Publish Now' : 'Schedule Post'}
            </Button>
            <Button variant="outline" className="w-full text-xs">
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
