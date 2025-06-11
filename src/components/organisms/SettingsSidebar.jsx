import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button'; // Using Button atom

const SettingsSidebar = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                            activeTab === tab.id
                                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        icon={ApperIcon.bind(null, { name: tab.icon })} // Pass icon via 'icon' prop
                    >
                        {tab.label}
                    </Button>
                ))}
            </nav>
        </div>
    );
};

SettingsSidebar.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};

export default SettingsSidebar;