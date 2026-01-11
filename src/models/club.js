// Club model
export class Club {
  constructor(id, name, description, events = [], members = [], announcements = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.events = events; // array of eventIds
    this.members = members; // array of userIds
    this.announcements = announcements; // array of announcement objects
  }
}