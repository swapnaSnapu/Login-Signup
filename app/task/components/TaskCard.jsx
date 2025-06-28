export default function TaskCard({ task }) {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="font-bold text-lg mb-1">{task.task}</h2>
      <p className="text-sm text-gray-600">Priority: {task.priority}</p>
      <p className="text-sm mb-2">Price: ₹{task.price}</p>

      {/* Show multiple images */}
      {task.images?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {task.images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Task image ${index + 1}`}
              className="rounded w-full h-32 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}