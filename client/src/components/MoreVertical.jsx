import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

const VerticalOptionsMenu = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = (e) => {
        e.stopPropagation(); 
        if (onEdit) onEdit();
        setIsOpen(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); 
        if (onDelete) onDelete();
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
        <button
            onClick={handleToggle}
            className="focus:outline-none"
        >
            <MoreVertical className="h-5 w-5 cursor-pointer hover:text-yellow-500" />
        </button>

        {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
                onClick={handleEdit}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
                Delete
            </button>
            </div>
        )}
        </div>
    );
};

export default VerticalOptionsMenu;