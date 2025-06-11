import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeroSection from '@/components/organisms/HomeHeroSection';
import HomeFeaturesSection from '@/components/organisms/HomeFeaturesSection';
import HomeQuickStatsSection from '@/components/organisms/HomeQuickStatsSection';

const HomePage = () => {
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

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handleExploreAnalytics = () => {
    navigate('/analytics');
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <HomeHeroSection
          onViewDashboard={handleViewDashboard}
          onExploreAnalytics={handleExploreAnalytics}
        />
        <HomeFeaturesSection features={features} />
        <HomeQuickStatsSection onGetStarted={handleGetStarted} />
      </div>
    </div>
  );
};

export default HomePage;