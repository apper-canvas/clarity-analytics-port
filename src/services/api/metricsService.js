import metricsData from '../mockData/metrics.json';
import { delay } from '../index';

class MetricsService {
  constructor() {
    this.data = [...metricsData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const metric = this.data.find(metric => metric.id === id);
    if (!metric) {
      throw new Error('Metric not found');
    }
    return { ...metric };
  }

  async create(metricData) {
    await delay(500);
    const newMetric = {
      id: Date.now().toString(),
      ...metricData,
      trend: metricData.trend || []
    };
    this.data.push(newMetric);
    return { ...newMetric };
  }

  async update(id, updates) {
    await delay(400);
    const index = this.data.findIndex(metric => metric.id === id);
    if (index === -1) {
      throw new Error('Metric not found');
    }
    
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.data.findIndex(metric => metric.id === id);
    if (index === -1) {
      throw new Error('Metric not found');
    }
    
    const deletedMetric = this.data.splice(index, 1)[0];
    return { ...deletedMetric };
  }

  async getByPeriod(period) {
    await delay(250);
    return this.data.filter(metric => metric.period === period).map(metric => ({ ...metric }));
  }

  async getTrendData(metricId, days = 30) {
    await delay(200);
    const metric = this.data.find(m => m.id === metricId);
    if (!metric) {
      throw new Error('Metric not found');
    }
    
    // Generate trend data if not exists
    if (!metric.trend || metric.trend.length < days) {
      const trend = Array.from({ length: days }, (_, i) => {
        const variation = (Math.random() - 0.5) * 0.1;
        return Math.round(metric.value * (1 + variation));
      });
      return trend;
    }
    
    return metric.trend.slice(-days);
  }
}

export default new MetricsService();