import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

function NotFound() {
  return (
    <div className="text-center mt-5">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaExclamationTriangle size={80} color="red" />
      </motion.div>
      <h1 className='text-white' style={{fontSize:'100px'}}>404</h1>
      <p className='text-white' style={{fontSize:'50px'}}>Page Not Found</p>
    </div>
  );
}

export default NotFound;
