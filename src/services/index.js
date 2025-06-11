import userService from './api/userService';
import metricsService from './api/metricsService';
import activityService from './api/activityService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export {
  userService,
  metricsService,
  activityService,
  delay
};