// Tooltip.js
import React from 'react';

const Tooltip = ({ text }) => (
    <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 z-10">
        {text}
    </div>
);

export default Tooltip;
