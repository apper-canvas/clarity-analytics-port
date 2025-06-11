import React from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';

const FormField = ({ label, type = 'text', value, onChange, placeholder, options, className = '', labelClassName = '', ...rest }) => {
    return (
        <div className={className}>
            {label && (
                <Text as="label" className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}>
                    {label}
                </Text>
            )}
            {type === 'select' ? (
                <Select value={value} onChange={onChange} {...rest}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </Select>
            ) : (
                <Input type={type} value={value} onChange={onChange} placeholder={placeholder} {...rest} />
            )}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'select']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    className: PropTypes.string,
    labelClassName: PropTypes.string,
};

export default FormField;