import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SeoToolsCard({ icon, title, pageLink }) {
  return (
    <motion.div
      className="bg-white rounded-xl border boredr-dark-700 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={pageLink} className="flex flex-col items-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
          <img src={icon} alt={title} className="w-8 h-8 object-contain" />
        </div>
        <p className="text-lg font-semibold text-gray-900">{title}</p>
      </Link>
    </motion.div>
  );
}

export default SeoToolsCard;
