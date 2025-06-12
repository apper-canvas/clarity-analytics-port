import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
const ChartCard = ({ title, options, series, type, height, delay = 0, noDataMessage, noDataIcon }) => {
    const hasData = series && series.some(s => s.data && s.data.length > 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card className="p-6">
                {title && <Text as="h3" className="text-lg font-medium text-gray-900 mb-6">{title}</Text>}
                {hasData ? (
                    <Chart options={options} series={series} type={type} height={height} />
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            {noDataIcon && <ApperIcon name={noDataIcon} size={48} className="mx-auto mb-4 text-gray-300" />}
                            <Text as="p">{noDataMessage}</Text>
                        </div>
                    </div>
                )}
            </Card>
        </motion.div>
    );
};

ChartCard.propTypes = {
    title: PropTypes.string,
    options: PropTypes.object.isRequired,
    series: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    delay: PropTypes.number,
    noDataMessage: PropTypes.string,
    noDataIcon: PropTypes.string,
};

export default ChartCard;