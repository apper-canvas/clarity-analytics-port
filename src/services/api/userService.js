import userData from '../mockData/users.json';
import { delay } from '../index';

class UserService {
  constructor() {
    this.data = [...userData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const user = this.data.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  }

  async create(userData) {
    await delay(500);
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      signupDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active'
    };
    this.data.push(newUser);
    return { ...newUser };
  }

  async update(id, updates) {
    await delay(400);
    const index = this.data.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const deletedUser = this.data.splice(index, 1)[0];
    return { ...deletedUser };
  }

  async getByPlan(planType) {
    await delay(250);
    return this.data.filter(user => user.plan === planType).map(user => ({ ...user }));
  }

  async getActiveUsers() {
    await delay(200);
    return this.data.filter(user => user.status === 'active').map(user => ({ ...user }));
  }
}

export default new UserService();