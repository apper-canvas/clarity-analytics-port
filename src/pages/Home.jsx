import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'BarChart3',
      title: 'Real-time Analytics',
      description: 'Monitor your key metrics with live updates and interactive charts'
    },
    {
      icon: 'Users',
      title: 'User Management',
      description: 'Track user behavior, segments, and engagement patterns'
    },
    {
      icon: 'FileText',
      title: 'Custom Reports',
      description: 'Create and schedule automated reports for your team'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="BarChart3" size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Clarity Analytics
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive SaaS admin panel for monitoring user engagement and making data-driven decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Dashboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/analytics')}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Explore Analytics
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Quick Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Users', value: '2,847', icon: 'Users', color: 'text-primary' },
              { label: 'Revenue', value: '$45,678', icon: 'DollarSign', color: 'text-semantic-success' },
              { label: 'Growth Rate', value: '+12.3%', icon: 'TrendingUp', color: 'text-semantic-info' },
              { label: 'Reports', value: '24', icon: 'FileText', color: 'text-secondary' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <ApperIcon name={stat.icon} size={24} className={`${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Get Started
              <ApperIcon name="ArrowRight" size={16} className="inline ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;