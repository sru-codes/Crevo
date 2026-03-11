"use client";

import { useState, useEffect, useMemo } from "react";
import { TrendingUp, Plus, Instagram, MoreHorizontal, X, Bell, Share2, RefreshCw, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function OverviewSection() {
  // State
  const [activeTab, setActiveTab] = useState<'locations' | 'age'>('locations');
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ followers: 0, reach: 0, engagement: 0 });
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New follower milestone reached!", type: "success", time: "2 min ago" },
    { id: 2, message: "Post scheduled for 2:00 PM", type: "info", time: "5 min ago" },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  // Animated stats
  useEffect(() => {
    const targets = { followers: 278534, reach: 5192879, engagement: 98.2 };
    const duration = 2000;
    const steps = 60;
    let current = { followers: 0, reach: 0, engagement: 0 };
    const timer = setInterval(() => {
      current.followers += targets.followers / steps;
      current.reach += targets.reach / steps;
      current.engagement += targets.engagement / steps;
      if (current.followers >= targets.followers) { current = targets; clearInterval(timer); }
      setAnimatedStats({ followers: Math.floor(current.followers), reach: Math.floor(current.reach), engagement: Math.min(current.engagement, targets.engagement) });
    }, duration / steps);
  }, []);

  const calendarData = useMemo(() => [[0,1,1,2,0,3,1],[2,0,1,3,3,2,0],[1,3,0,2,1,2,2],[0,1,2,3,1,1,2],[2,1,3,1,2,0,1]], []);

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return "bg-gray-100 dark:bg-gray-800";
      case 1: return "bg-purple-200 dark:bg-purple-800";
      case 2: return "bg-purple-400 dark:bg-purple-600";
      case 3: return "bg-purple-600 dark:bg-purple-500";
      default: return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const locationData = useMemo(() => [
    { country: 'United States', count: 197520, percentage: 100 },
    { country: 'Brazil', count: 32985, percentage: 65 },
    { country: 'Switzerland', count: 10254, percentage: 35 },
  ], []);

  const ageData = useMemo(() => [
    { range: '18-24', count: 89234, percentage: 85 },
    { range: '25-34', count: 156789, percentage: 100 },
    { range: '35-44', count: 32511, percentage: 45 },
  ], []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6">
      {/* Notifications Bar */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex flex-wrap gap-2">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm text-sm border border-white/20 dark:border-gray-700/20">
              <Bell className="h-4 w-4 text-blue-500 animate-pulse" />
              <span className="text-gray-700 dark:text-gray-300">{n.message}</span>
              <span className="text-xs text-gray-500">{n.time}</span>
              <button onClick={() => dismissNotification(n.id)} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs text-gray-600 dark:text-gray-400">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
              {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </div>
            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Left Column — Profile Summary */}
        <div className="space-y-4 lg:space-y-6">
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">@samanthawilliam_</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Share2 className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><MoreHorizontal className="h-4 w-4 text-gray-400" /></Button>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-end gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{animatedStats.followers.toLocaleString()}</h2>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mb-1" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Followers</p>
              <p className="text-xs text-green-600 dark:text-green-400">+2.1% from last month</p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex gap-2 sm:gap-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <button onClick={() => setActiveTab('locations')} className={`text-xs sm:text-sm font-medium pb-2 px-1 border-b-2 transition-colors ${activeTab === 'locations' ? 'text-gray-900 dark:text-white border-blue-500' : 'text-gray-500 border-transparent'}`}>Top Locations</button>
                <button onClick={() => setActiveTab('age')} className={`text-xs sm:text-sm font-medium pb-2 px-1 border-b-2 transition-colors ${activeTab === 'age' ? 'text-gray-900 dark:text-white border-blue-500' : 'text-gray-500 border-transparent'}`}>Age Range</button>
              </div>
              <div className="space-y-3">
                {(activeTab === 'locations' ? locationData : ageData).map((item, index) => (
                  <div key={index} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-2 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {activeTab === 'locations' ? (item as typeof locationData[0]).country : (item as typeof ageData[0]).range}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={`${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : 'bg-blue-300'} h-2 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Views Chart */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Profile Views Period</h3>
              </div>
              <div className="relative h-16 sm:h-20 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg p-3 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 40">
                  <defs><linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs>
                  <path d="M 5,35 C 25,25 35,15 55,20 C 75,25 85,10 95,15" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                  <circle cx="75" cy="12" r="3" fill="#3B82F6" className="animate-ping" />
                </svg>
                <div className="absolute top-1 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">128.3K views</div>
              </div>
            </div>
          </Card>

          {/* Your Accounts */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Your Accounts</h3>
              <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 text-xs sm:text-sm" onClick={() => setShowAddAccountModal(true)}>
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Add Account
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"><span className="text-white text-xs sm:text-sm font-medium">S</span></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">@samanthawilliam_</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{animatedStats.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">Primary</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center"><span className="text-white text-xs sm:text-sm font-medium">S</span></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">@smanthawilliam_</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">4,982 followers</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs">Manage</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Center Column */}
        <div className="space-y-4 lg:space-y-6">
          {/* Post Activity */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Post Activity</h3>
              <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 text-xs sm:text-sm w-full sm:w-auto">Change Period</Button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">From 15 Feb - 15 May, 2024</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><p className="text-xl sm:text-2xl font-bold">687</p><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Stories</p></div>
              <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><p className="text-xl sm:text-2xl font-bold">189</p><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Posts</p></div>
              <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><p className="text-xl sm:text-2xl font-bold">24</p><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Reels</p></div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarData.flat().map((level, i) => (
                <div key={i} className={`w-4 h-4 sm:w-6 sm:h-6 rounded cursor-pointer transition-all duration-200 ${getActivityColor(level)}`} title={`${level} posts on day ${i + 1}`} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
              <span>Less activity</span><span>More activity</span>
            </div>
          </Card>

          {/* Anomaly Detection */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Anomaly Detected</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              Your followers are increasing beyond our predictions. It could be because someone shared one of your posts.
            </p>
            <div className="relative mb-4 sm:mb-6">
              <div className="flex items-end gap-1 sm:gap-2 h-24 sm:h-32">
                {[20, 25, 30, 45, 80, 35, 40].map((height, i) => (
                  <div key={i} className="flex-1 bg-teal-200 dark:bg-teal-700 rounded-t hover:bg-teal-300 dark:hover:bg-teal-600 transition-colors cursor-pointer" style={{ height: `${height}%` }}>
                    {height === 80 && (
                      <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded animate-bounce">+10K Followers</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div><p className="text-xl sm:text-2xl font-bold">{animatedStats.engagement.toFixed(1)}%</p><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Prediction</p></div>
              <div className="text-right sm:text-left"><p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">45%</p><p className="text-xs text-gray-500">Secondary</p></div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors" size="sm">See Details</Button>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-6 md:col-span-2 xl:col-span-1">
          {/* Post Schedule */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div><h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Post Schedule</h3><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">26 posts scheduled</p></div>
              <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 text-xs sm:text-sm w-full sm:w-auto"><Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Add Post</Button>
            </div>
            <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto">
              {[
                { time: "10:00", color: "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20", text: "🕘 Competitions can trigger bigger engagement boosts" },
                { time: "12:00", color: "bg-gray-50 dark:bg-gray-700", text: "More weekend to healthier choices as you start to..." },
                { time: "14:00", color: "border-pink-400 bg-pink-50 dark:bg-pink-900/20", text: "💝 Giving people back and you can focus to..." },
                { time: "16:00", color: "bg-gray-50 dark:bg-gray-700", text: "Weekly brand story and industry focus" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center min-w-[2.5rem]">
                    <span className="text-xs sm:text-sm font-medium">{item.time}</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1" />
                  </div>
                  <div className={`flex-1 p-3 rounded-lg ${item.color} hover:opacity-80 transition-opacity cursor-pointer ${item.color.includes('border') ? 'border-l-4' : ''}`}>
                    <p className="text-xs sm:text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Post Insights */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Post Insights</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">Posted on May 15, 2024 at 1:00PM</p>
            <div className="space-y-4 mb-4 sm:mb-6">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Accounts Reached</p>
                <p className="text-xl sm:text-2xl font-bold">{animatedStats.reach.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Followers</p>
                <p className="text-base sm:text-lg font-bold text-blue-600">+2,953</p>
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <div className="flex items-end gap-1 h-12 sm:h-16">
                {[30, 45, 60, 80, 65, 40, 55].map((height, i) => (
                  <div key={i} className="flex-1 bg-blue-400 dark:bg-blue-600 rounded-t hover:bg-blue-500 transition-colors cursor-pointer" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Unique Finding</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">We have provided a new reach and followers analysis. See why this post worked statistically.</p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-xs sm:text-sm">Subscribe for another finding</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Account</h3>
              <Button size="sm" variant="ghost" onClick={() => setShowAddAccountModal(false)} className="h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Platform</label>
                <select className="w-full p-3 border rounded-lg bg-background"><option>Instagram</option><option>Twitter</option><option>Facebook</option><option>LinkedIn</option><option>TikTok</option><option>YouTube</option><option>Discord</option><option>Telegram</option></select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input type="text" placeholder="@username" className="w-full p-3 border rounded-lg bg-background" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddAccountModal(false)}>Cancel</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowAddAccountModal(false)}>Connect Account</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
