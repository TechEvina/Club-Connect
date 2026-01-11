// User model
export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.username = data.username || '';
    this.school = data.school || '';
    this.language = data.language || 'en';
    this.role = data.role || 'student';
    this.joinedClubs = data.joinedClubs || []; // array of clubIds
    this.badges = data.badges || []; // array of badge objects
    this.notifications = data.notifications || {
      events: true,
      messages: true,
      voting: true,
      attendance: true,
      announcements: true
    };
    this.profilePicture = data.profilePicture || null;
    this.createdAt = data.createdAt || new Date();
    this.lastActive = data.lastActive || new Date();
  }

  // Convert to Firestore document
  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      username: this.username,
      school: this.school,
      language: this.language,
      role: this.role,
      joinedClubs: this.joinedClubs,
      badges: this.badges,
      notifications: this.notifications,
      profilePicture: this.profilePicture,
      createdAt: this.createdAt,
      lastActive: this.lastActive
    };
  }

  // Create from Firestore document
  static fromFirestore(id, data) {
    return new User({
      id,
      ...data
    });
  }
}