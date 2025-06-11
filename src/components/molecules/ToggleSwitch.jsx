import React from 'react';
import PropTypes from 'prop-types';
import Text from '@/components/atoms/Text';

const ToggleSwitch = ({ checked, onChange, label, description, className = '' }) => {
    return (
        <div className={`flex items-center justify-between py-3 ${className}`}>
            <div>
                <Text as="p" className="text-sm font-medium text-gray-900">{label}</Text>
                <Text as="p" className="text-sm text-gray-500">{description}</Text>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
        </div>
    );
};

ToggleSwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ToggleSwitch;