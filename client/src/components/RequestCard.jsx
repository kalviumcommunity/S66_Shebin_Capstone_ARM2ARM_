import VerticalOptionsMenu from "./MoreVertical";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


export const RequestCard = ({ request, onClick, onEdit, onDelete }) => {
    const getStatusClass = (status) => {
      switch (status) {
        case 'Critical':
          return 'bg-red-700 text-white';
        case 'High':
          return 'bg-orange-500 text-white';
        case 'Medium':
          return 'bg-yellow-500 text-white';
        case 'Low':
          return 'bg-green-700 text-white';
        default:
          return 'bg-gray-700 text-white';
      }
    };
  
    return (
      <div
        className="relative p-4 bg-white rounded-lg shadow-md cursor-pointer"
        onClick={() => onClick(request)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-red-600 font-bold text-lg mr-2">{request.bloodType}</span>
            <h3 className="font-bold text-lg text-gray-800">{request.name}</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${getStatusClass(request.status)}`}>
            {request.status}
          </span>
        </div>
  
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.209 0-4 1.791-4 4v1h8v-1c0-2.209-1.791-4-4-4z"
            ></path>
          </svg>
          <span>{request.location}</span>
          <span className="mx-1">•</span>
          <span>{dayjs(request.createdAt).fromNow()}</span>
        </div>
  
        <p className="text-sm text-red-500 mb-2">Needed: {request.units} units</p>
        <p className="text-sm text-gray-600">
          Contact: <span className="font-medium">{request.contactNumber}</span>
        </p>
  
        {onEdit && onDelete && (
          <div className="absolute bottom-2 right-2 z-10">
            <VerticalOptionsMenu onEdit={onEdit} onDelete={onDelete} />
          </div>
        )}
      </div>
    );
  };
