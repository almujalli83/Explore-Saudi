const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${currency}`;
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const month = MONTHS[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${period}`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getTimeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) {
    return 'just now';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }
  if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  }
  return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trimEnd() + '...';
}
