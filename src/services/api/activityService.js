import activityData from '../mockData/activities.json';
import { delay } from '../index';

class ActivityService {
  constructor() {
    this.data = [...activityData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const activity = this.data.find(activity => activity.id === id);
    if (!activity) {
      throw new Error('Activity not found');
    }
    return { ...activity };
  }

  async create(activityData) {
    await delay(500);
    const newActivity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...activityData
    };
    this.data.push(newActivity);
    return { ...newActivity };
  }

  async update(id, updates) {
    await delay(400);
    const index = this.data.findIndex(activity => activity.id === id);
    if (index === -1) {
      throw new Error('Activity not found');
    }
    
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(activity => activity.id === id);
    if (index === -1) {
      throw new Error('Activity not found');
    }
    
    const deletedActivity = this.data.splice(index, 1)[0];
    return { ...deletedActivity };
  }

  async getByUserId(userId) {
    await delay(250);
    return this.data.filter(activity => activity.userId === userId).map(activity => ({ ...activity }));
  }

  async getByAction(action) {
    await delay(200);
    return this.data.filter(activity => activity.action === action).map(activity => ({ ...activity }));
  }

  async getRecentActivities(limit = 10) {
    await delay(200);
    return this.data
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit)
      .map(activity => ({ ...activity }));
  }
}

export default new ActivityService();