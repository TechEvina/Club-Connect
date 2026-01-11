// School data - can be replaced with API call
export const schools = [
  { id: 1, name: 'Central High School', location: 'Downtown' },
  { id: 2, name: 'Westside Academy', location: 'West District' },
  { id: 3, name: 'Tech University', location: 'North Campus' },
  { id: 4, name: 'State College', location: 'State Avenue' },
  { id: 5, name: 'Community College', location: 'East Side' },
  { id: 6, name: 'Lincoln High School', location: 'Lincoln Park' },
  { id: 7, name: 'Washington University', location: 'University District' },
  { id: 8, name: 'Roosevelt Academy', location: 'Roosevelt Square' },
];

// Languages for multi-language support
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

// User roles
export const userRoles = [
  { id: 'student', name: 'Student / Member', icon: '👤', description: 'Regular club member' },
  { id: 'president', name: 'President', icon: '👑', description: 'Club president or leader' },
  { id: 'vicepresident', name: 'Vice President', icon: '⭐', description: 'Second in command' },
  { id: 'treasurer', name: 'Treasurer', icon: '💰', description: 'Manages club finances' },
  { id: 'secretary', name: 'Secretary', icon: '📝', description: 'Records meetings and activities' },
  { id: 'officer', name: 'Officer', icon: '🎯', description: 'General officer position' },
  { id: 'advisor', name: 'Teacher / Advisor', icon: '👨‍🏫', description: 'Faculty advisor' },
];

// Notification types
export const notificationTypes = [
  { id: 'events', label: 'New event reminders', description: 'Get notified about upcoming events' },
  { id: 'messages', label: 'Messages from officers', description: 'Receive messages from club leaders' },
  { id: 'voting', label: 'Voting / polls', description: 'Notifications about new polls and voting' },
  { id: 'attendance', label: 'Attendance alerts', description: 'Reminders to check in to events' },
  { id: 'announcements', label: 'Club announcements', description: 'General club updates and news' },
];
