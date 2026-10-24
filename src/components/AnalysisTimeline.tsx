import React from 'react';
import { TimelineEvent, WarningLanguage } from '../types/analysis';
import { formatTime } from '../utils/audioValidation';

interface AnalysisTimelineProps {
  events: TimelineEvent[];
  language?: WarningLanguage;
  onSeekTo?: (timeSec: number) => void;
}

export const AnalysisTimeline: React.FC<AnalysisTimelineProps> = ({
  events,
  onSeekTo,
}) => {
  if (events.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <p className="text-sm font-medium text-slate-400">
          No chronological timeline events logged yet. Select a call and start playback above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-navy-900 dark:text-white">
          Chronological Detection Timeline
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {events.length} Event{events.length !== 1 ? 's' : ''} Recorded
        </span>
      </div>

      <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
        {events.map((evt) => {
          let dotColor = 'bg-blue-500';
          if (evt.severity === 'critical') dotColor = 'bg-red-500 ring-4 ring-red-100 dark:ring-red-900';
          else if (evt.severity === 'high') dotColor = 'bg-rose-500';
          else if (evt.severity === 'medium') dotColor = 'bg-amber-500';
          else if (evt.type === 'action') dotColor = 'bg-emerald-500';

          return (
            <div key={evt.id} className="relative group">
              <div
                className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ${dotColor} transition-all`}
              />

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSeekTo?.(evt.timestampSeconds)}
                      className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded"
                      title="Jump to audio"
                    >
                      {formatTime(evt.timestampSeconds)}
                    </button>
                    <span className="text-xs font-bold text-navy-900 dark:text-slate-200">{evt.label}</span>
                  </div>

                  {evt.details && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-0.5">
                      {evt.details}
                    </p>
                  )}
                </div>

                <span className="text-[11px] font-semibold uppercase text-slate-400">
                  {evt.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
