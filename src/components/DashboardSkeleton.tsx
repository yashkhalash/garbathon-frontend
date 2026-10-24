import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" data-testid="dashboard-skeleton">
      {/* 1. Aadhaar Vault Banner Skeleton */}
      <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-800/10 to-amber-500/10 border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between">
        <div className="space-y-2 flex-1 max-w-lg">
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded-md w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
        </div>
        <div className="h-10 w-36 bg-amber-400/20 rounded-xl hidden sm:block" />
      </div>

      {/* 2. Step Guide Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800/60 rounded-xl p-3 space-y-2">
              <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2" />
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Dashboard Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Audio Presets Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-44" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-24" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-28" />
                  </div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/5" />
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                </div>
              ))}
            </div>
          </div>

          {/* Audio Player Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg w-full" />
            <div className="flex justify-between items-center pt-2">
              <div className="flex space-x-2">
                <div className="h-11 w-11 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-11 w-11 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
              <div className="h-11 w-44 bg-blue-600/20 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Risk Card Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-36" />
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="flex items-center space-x-4 py-2">
              <div className="h-20 w-20 rounded-full border-4 border-slate-200 dark:border-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              </div>
            </div>
          </div>

          {/* Red Flags Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-32 mb-2" />
            <div className="h-20 bg-slate-100 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
