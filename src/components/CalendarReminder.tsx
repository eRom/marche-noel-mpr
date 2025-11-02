'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { downloadICS, generateGoogleCalendarURL } from '@/lib/calendar';
import { track } from '@vercel/analytics';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Icône Google Calendar
const GoogleCalendarIcon = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5">
    <rect x="128" y="128" width="336" height="336" rx="57" ry="57" fill="#fff"/>
    <rect x="128" y="128" width="336" height="336" rx="57" ry="57" fill="none" stroke="#1a73e8" strokeWidth="32"/>
    <rect x="169.37" y="169.37" width="252.26" height="252.26" rx="17" ry="17" fill="#1a73e8"/>
    <rect x="169.37" y="169.37" width="252.26" height="252.26" rx="17" ry="17" fill="none" stroke="#fff" strokeWidth="16"/>
    <path d="M256 256l-64 64M256 256l64 64M256 256V128" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="32"/>
    <circle cx="256" cy="256" r="24" fill="#fff"/>
  </svg>
);

interface CalendarReminderProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export default function CalendarReminder({
  variant = 'default',
  size = 'default',
  className = '',
}: CalendarReminderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadICS = () => {
    try {
      downloadICS();
      track('calendar_reminder_download', { type: 'ics' });
      
      // Toast notification si disponible
      if (typeof window !== 'undefined' && 'toast' in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).toast?.success?.('✅ Calendrier téléchargé !', {
          description: 'Les 4 dates ont été ajoutées à votre calendrier',
        });
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du calendrier:', error);
    }
  };

  const handleGoogleCalendar = () => {
    try {
      const url = generateGoogleCalendarURL();
      window.open(url, '_blank', 'noopener,noreferrer');
      track('calendar_reminder_download', { type: 'google' });
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de Google Calendar:', error);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`gap-2 transition-transform hover:scale-105 ${className}`}
          aria-label="Ajouter les dates du marché de Noël à votre calendrier"
        >
          <Calendar className="w-5 h-5" aria-hidden="true" />
          <span>Me rappeler le jour de l&apos;ouverture</span>
          <ChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-72">
       
        <DropdownMenuItem onClick={handleGoogleCalendar} className="cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
              <GoogleCalendarIcon />
            </div>
            <div className="flex-1">
              <div className="font-medium">Google Calendrier</div>
              <div className="text-xs text-muted-foreground">Ouvrir dans Google Calendar</div>
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleDownloadICS} className="cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Tous calendriers</div>
              <div className="text-xs text-muted-foreground">Télécharger fichier .ics</div>
            </div>
          </div>
        </DropdownMenuItem>
        
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

