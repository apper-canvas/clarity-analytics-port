import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, checked, onChange, className = '', ...rest }) => {
    return (
        <label className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="rounded border-gray-300 text-primary focus:ring-primary mr-2"
                {...rest}
            />
            {label && <span className="text-sm">{label}</span>}
        </label>
    );
};

Checkbox.propTypes = {
    label: PropTypes.node,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Checkbox;