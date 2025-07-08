import React from "react";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const VerticalOptionsMenu = ({ onEdit, onDelete }) => {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
            <MoreVertical className="h-5 w-5 cursor-pointer hover:text-yellow-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
            Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default VerticalOptionsMenu;
