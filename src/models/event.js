// Event model
export class Event {
  constructor(id, name, dateTime, location, participants = []) {
    this.id = id;
    this.name = name;
    this.dateTime = dateTime; // Date object or string
    this.location = location;
    this.participants = participants; // array of userIds
  }
}