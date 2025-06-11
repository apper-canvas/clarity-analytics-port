import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundContent = ({ onGoToDashboard, onGoBack }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="mb-8"
                >
                    <ApperIcon name="AlertCircle" size={80} className="mx-auto text-gray-300" />
                </motion.div>

                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="space-y-4">
                    <Button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onGoToDashboard}
                        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        icon={ApperIcon.bind(null, { name: 'Home' })}
                    >
                        Go to Dashboard
                    </Button>

                    <Button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onGoBack}
                        className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        icon={ApperIcon.bind(null, { name: 'ArrowLeft' })}
                    >
                        Go Back
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

NotFoundContent.propTypes = {
    onGoToDashboard: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default NotFoundContent;