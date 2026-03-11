"use client";

import { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon,
  List, LayoutGrid, Clock, MoreHorizontal, Edit, Trash2, Copy, Eye
} from "lucide-react";

type CalendarView = 'month' | 'week' | 'day' | 'list';

interface CalendarPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledAt: string;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  mediaType: 'text' | 'image' | 'video' | 'carousel';
  color: string;
}

const DEMO_POSTS: CalendarPost[] = [
  { id: '1', content: '🚀 New product launch announcement!', platforms: ['instagram', 'facebook'], scheduledAt: new Date(Date.now() + 86400000).toISOString(), status: 'scheduled', mediaType: 'carousel', color: '#E4405F' },
  { id: '2', content: '💡 Tips for growing your audience', platforms: ['x', 'linkedin'], scheduledAt: new Date(Date.now() + 172800000).toISOString(), status: 'scheduled', mediaType: 'text', color: '#0077B5' },
  { id: '3', content: '🎥 Behind the scenes look!', platforms: ['tiktok', 'youtube'], scheduledAt: new Date(Date.now() + 259200000).toISOString(), status: 'draft', mediaType: 'video', color: '#FF0000' },
  { id: '4', content: '📊 Weekly analytics report', platforms: ['linkedin'], scheduledAt: new Date(Date.now() - 86400000).toISOString(), status: 'posted', mediaType: 'text', color: '#0077B5' },
  { id: '5', content: '🎉 Celebrating 50K followers!', platforms: ['instagram', 'x', 'facebook'], scheduledAt: new Date(Date.now() - 172800000).toISOString(), status: 'posted', mediaType: 'image', color: '#E4405F' },
  { id: '6', content: '🎁 Giveaway announcement', platforms: ['instagram', 'tiktok'], scheduledAt: new Date(Date.now() + 345600000).toISOString(), status: 'scheduled', mediaType: 'image', color: '#010101' },
  { id: '7', content: '📝 Blog post: Content creation guide', platforms: ['linkedin', 'x'], scheduledAt: new Date(Date.now() + 432000000).toISOString(), status: 'draft', mediaType: 'text', color: '#1DA1F2' },
  { id: '8', content: '🎬 Tutorial: How to edit reels', platforms: ['youtube', 'tiktok'], scheduledAt: new Date(Date.now() + 518400000).toISOString(), status: 'scheduled', mediaType: 'video', color: '#FF0000' },
];

const PLATFORM_EMOJI: Record<string, string> = {
  instagram: '📸', x: '𝕏', youtube: '▶️', tiktok: '🎵', facebook: '📘',
  linkedin: '💼', discord: '🎮', telegram: '✈️', reddit: '🟠', pinterest: '📌',
  threads: '🧵', bluesky: '🦋',
};

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  posted: 'bg-green-500/20 text-green-400 border-green-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function CalendarSection() {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts] = useState<CalendarPost[]>(DEMO_POSTS);
  const [selectedPost, setSelectedPost] = useState<CalendarPost | null>(null);

  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      if (view === 'month') d.setMonth(d.getMonth() + (direction === 'next' ? 1 : -1));
      else if (view === 'week') d.setDate(d.getDate() + (direction === 'next' ? 7 : -7));
      else d.setDate(d.getDate() + (direction === 'next' ? 1 : -1));
      return d;
    });
  }, [view]);

  const goToday = useCallback(() => setCurrentDate(new Date()), []);

  // Calendar Grid for Month View
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday start
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: { date: Date; isCurrentMonth: boolean; posts: CalendarPost[] }[] = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date, isCurrentMonth: false, posts: getPostsForDate(date) });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true, posts: getPostsForDate(date) });
    }

    // Next month days to fill 42 cells
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, posts: getPostsForDate(date) });
    }

    return days;
  }, [currentDate, posts]);

  // Week view days
  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    const day = start.getDay();
    start.setDate(start.getDate() - (day === 0 ? 6 : day - 1)); // Monday start
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return { date, posts: getPostsForDate(date) };
    });
  }, [currentDate, posts]);

  function getPostsForDate(date: Date): CalendarPost[] {
    return posts.filter(p => {
      const postDate = new Date(p.scheduledAt);
      return postDate.toDateString() === date.toDateString();
    });
  }

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatTitle = () => {
    if (view === 'month') return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (view === 'week') {
      const start = new Date(currentDate);
      const day = start.getDay();
      start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Content Calendar</h2>
          <p className="text-sm text-muted-foreground">Schedule and manage posts across all platforms</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Schedule Post
        </Button>
      </div>

      {/* Controls */}
      <Card className="p-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}><ChevronRight className="h-4 w-4" /></Button>
            <h3 className="text-lg font-semibold ml-2">{formatTitle()}</h3>
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {([
              { id: 'month' as const, icon: LayoutGrid, label: 'Month' },
              { id: 'week' as const, icon: CalendarIcon, label: 'Week' },
              { id: 'day' as const, icon: Clock, label: 'Day' },
              { id: 'list' as const, icon: List, label: 'List' },
            ]).map(v => (
              <Button key={v.id} variant={view === v.id ? 'default' : 'ghost'} size="sm" onClick={() => setView(v.id)} className="text-xs gap-1">
                <v.icon className="h-3 w-3" /> {v.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Scheduled', count: posts.filter(p => p.status === 'scheduled').length, color: 'text-blue-500' },
          { label: 'Published', count: posts.filter(p => p.status === 'posted').length, color: 'text-green-500' },
          { label: 'Drafts', count: posts.filter(p => p.status === 'draft').length, color: 'text-gray-500' },
          { label: 'Failed', count: posts.filter(p => p.status === 'failed').length, color: 'text-red-500' },
        ].map(s => (
          <Card key={s.label} className="p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Calendar Grid */}
      {view === 'month' && (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-7 border-b">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="p-2 text-center text-xs font-medium text-muted-foreground border-r last:border-r-0">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((day, i) => (
              <div key={i} className={`min-h-[100px] p-1 border-r border-b last:border-r-0 ${!day.isCurrentMonth ? 'opacity-40' : ''} ${isToday(day.date) ? 'bg-violet-500/5' : ''}`}>
                <div className={`text-xs font-medium mb-1 ${isToday(day.date) ? 'bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-muted-foreground p-1'}`}>
                  {day.date.getDate()}
                </div>
                <div className="space-y-1">
                  {day.posts.slice(0, 3).map(post => (
                    <button key={post.id} onClick={() => setSelectedPost(post)} className="w-full text-left px-1.5 py-0.5 rounded text-xs truncate hover:opacity-80 transition-opacity" style={{ backgroundColor: post.color + '20', color: post.color, borderLeft: `2px solid ${post.color}` }}>
                      {post.platforms.map(p => PLATFORM_EMOJI[p] || '').join('')} {post.content.slice(0, 20)}...
                    </button>
                  ))}
                  {day.posts.length > 3 && (
                    <p className="text-xs text-muted-foreground px-1">+{day.posts.length - 3} more</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Week View */}
      {view === 'week' && (
        <Card className="overflow-auto max-h-[600px]">
          <div className="grid grid-cols-8 min-w-[700px]">
            <div className="border-r border-b p-2 text-xs font-medium text-muted-foreground sticky top-0 bg-card z-10">Time</div>
            {weekDays.map(d => (
              <div key={d.date.toISOString()} className={`border-r border-b p-2 text-center sticky top-0 z-10 ${isToday(d.date) ? 'bg-violet-500/10' : 'bg-card'}`}>
                <div className="text-xs font-medium">{d.date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className={`text-sm font-bold ${isToday(d.date) ? 'text-violet-500' : ''}`}>{d.date.getDate()}</div>
              </div>
            ))}
            {hours.map(hour => (
              <>
                <div key={`h-${hour}`} className="border-r border-b p-1 text-xs text-muted-foreground text-right pr-2">{hour.toString().padStart(2, '0')}:00</div>
                {weekDays.map(d => {
                  const hourPosts = d.posts.filter(p => new Date(p.scheduledAt).getHours() === hour);
                  return (
                    <div key={`${d.date.toISOString()}-${hour}`} className={`border-r border-b min-h-[50px] p-0.5 ${isToday(d.date) ? 'bg-violet-500/5' : ''}`}>
                      {hourPosts.map(post => (
                        <button key={post.id} onClick={() => setSelectedPost(post)} className="w-full text-left px-1 py-0.5 rounded text-xs truncate mb-0.5 hover:opacity-80" style={{ backgroundColor: post.color + '30', color: post.color }}>
                          {post.content.slice(0, 15)}...
                        </button>
                      ))}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </Card>
      )}

      {/* Day View */}
      {view === 'day' && (
        <Card className="overflow-auto max-h-[600px]">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
          </div>
          <div className="divide-y">
            {hours.map(hour => {
              const hourPosts = getPostsForDate(currentDate).filter(p => new Date(p.scheduledAt).getHours() === hour);
              return (
                <div key={hour} className="flex min-h-[60px]">
                  <div className="w-16 p-2 text-xs text-muted-foreground text-right border-r shrink-0">{hour.toString().padStart(2, '0')}:00</div>
                  <div className="flex-1 p-1 space-y-1">
                    {hourPosts.map(post => (
                      <button key={post.id} onClick={() => setSelectedPost(post)} className="w-full text-left p-2 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2" style={{ backgroundColor: post.color + '15', borderLeft: `3px solid ${post.color}` }}>
                        <span>{post.platforms.map(p => PLATFORM_EMOJI[p]).join(' ')}</span>
                        <span className="text-sm truncate flex-1">{post.content}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[post.status]}`}>{post.status}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-2">
          {posts.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()).map(post => (
            <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedPost(post)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: post.color + '20' }}>
                  {post.platforms.map(p => PLATFORM_EMOJI[p]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{new Date(post.scheduledAt).toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground capitalize">{post.mediaType}</span>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[post.status]}`}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
                <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
          <Card className="w-full max-w-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Post Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>✕</Button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg"><p className="text-sm">{selectedPost.content}</p></div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Platforms:</span>
                {selectedPost.platforms.map(p => (
                  <span key={p} className="text-xs px-2 py-1 rounded-full bg-muted">{PLATFORM_EMOJI[p]} {p}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{new Date(selectedPost.scheduledAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Status:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[selectedPost.status]}`}>{selectedPost.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Type:</span>
                <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">{selectedPost.mediaType}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1"><Edit className="mr-1 h-3 w-3" />Edit</Button>
              <Button variant="outline" size="sm" className="flex-1"><Copy className="mr-1 h-3 w-3" />Duplicate</Button>
              <Button variant="outline" size="sm" className="flex-1"><Eye className="mr-1 h-3 w-3" />Preview</Button>
              <Button variant="destructive" size="sm"><Trash2 className="h-3 w-3" /></Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
