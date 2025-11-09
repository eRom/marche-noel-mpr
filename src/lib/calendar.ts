/**
 * Bibliothèque de génération de fichiers iCalendar (.ics)
 * pour le Marché de Noël du MPR de Nantes
 */

export interface CalendarEvent {
  uid: string;
  start: string; // Format: YYYYMMDDTHHMMSS
  end: string;
  summary: string;
  description: string;
  location: string;
  url: string;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    uid: "marche-noel-mpr-2025-11-27@mpr-noel.com",
    start: "20251127T160000",
    end: "20251127T190000",
    summary: "Marché de Noël du MPR de Nantes",
    description:
      "Découvrez la magie de Noël au sein du pôle MPR du CHU de Nantes. Artisans patients, animations, ambiance festive !\\n\\nPlus d'infos : https://mpr-noel.romain-ecarnot.com",
    location:
      "Hôpital Saint-Jacques - CHU de Nantes, 85 Rue Saint-Jacques, 44093 Nantes",
    url: "https://mpr-noel.romain-ecarnot.com",
  },
  {
    uid: "marche-noel-mpr-2025-12-11@mpr-noel.com",
    start: "20251211T160000",
    end: "20251211T190000",
    summary: "Marché de Noël du MPR de Nantes",
    description:
      "Découvrez la magie de Noël au sein du pôle MPR du CHU de Nantes. Artisans patients, animations, ambiance festive !\\n\\nPlus d'infos : https://mpr-noel.romain-ecarnot.com",
    location:
      "Hôpital Saint-Jacques - CHU de Nantes, 85 Rue Saint-Jacques, 44093 Nantes",
    url: "https://mpr-noel.romain-ecarnot.com",
  },
  {
    uid: "marche-noel-mpr-2025-12-13@mpr-noel.com",
    start: "20251213T140000",
    end: "20251213T180000",
    summary: "Marché de Noël du MPR de Nantes",
    description:
      "Découvrez la magie de Noël au sein du pôle MPR du CHU de Nantes. Artisans patients, animations, ambiance festive !\\n\\nPlus d'infos : https://mpr-noel.romain-ecarnot.com",
    location:
      "Hôpital Saint-Jacques - CHU de Nantes, 85 Rue Saint-Jacques, 44093 Nantes",
    url: "https://mpr-noel.romain-ecarnot.com",
  },
  {
    uid: "marche-noel-mpr-2025-12-16@mpr-noel.com",
    start: "20251216T160000",
    end: "20251216T190000",
    summary: "Marché de Noël du MPR de Nantes",
    description:
      "Découvrez la magie de Noël au sein du pôle MPR du CHU de Nantes. Artisans patients, animations, ambiance festive !\\n\\nPlus d'infos : https://mpr-noel.romain-ecarnot.com",
    location:
      "Hôpital Saint-Jacques - CHU de Nantes, 85 Rue Saint-Jacques, 44093 Nantes",
    url: "https://mpr-noel.romain-ecarnot.com",
  },
];

/**
 * Génère un fichier iCalendar (.ics) avec tous les événements
 */
export function generateICS(): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Marché de Noël MPR//FR
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-TIMEZONE:Europe/Paris
BEGIN:VTIMEZONE
TZID:Europe/Paris
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
`;

  CALENDAR_EVENTS.forEach((event) => {
    ics += `
BEGIN:VEVENT
UID:${event.uid}
DTSTAMP:${now}
DTSTART;TZID=Europe/Paris:${event.start}
DTEND;TZID=Europe/Paris:${event.end}
SUMMARY:${event.summary}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url}
BEGIN:VALARM
TRIGGER:-P1DT7H
ACTION:DISPLAY
DESCRIPTION:Rappel : Le marché de Noël du MPR ouvre demain !
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Le marché de Noël du MPR commence dans 1 heure !
END:VALARM
END:VEVENT
`;
  });

  ics += "END:VCALENDAR";

  return ics;
}

/**
 * Télécharge le fichier .ics
 */
export function downloadICS(): void {
  const icsContent = generateICS();
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "marche-noel-mpr-2025.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Génère un lien Google Calendar pour le premier événement
 * (Google Calendar ne supporte qu'un événement à la fois via URL)
 */
export function generateGoogleCalendarURL(): string {
  const firstEvent = CALENDAR_EVENTS[0];

  // Format: YYYYMMDDTHHmmSS / YYYYMMDDTHHmmSS
  const dates = `${firstEvent.start}/${firstEvent.end}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: firstEvent.summary,
    dates: dates,
    details: firstEvent.description.replace(/\\n/g, "\n"),
    location: firstEvent.location,
    ctz: "Europe/Paris",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Retourne les informations des événements pour affichage
 */
export function getEventDates(): Array<{ date: string; time: string }> {
  return [
    { date: "27 novembre 2025", time: "16h - 19h" },
    { date: "11 décembre 2025", time: "16h - 19h" },
    { date: "13 décembre 2025", time: "14h - 18h" },
    { date: "16 décembre 2025", time: "16h - 19h" },
  ];
}
