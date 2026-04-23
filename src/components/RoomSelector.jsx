export default function RoomSelector({ rooms, selected, onSelect }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-sm font-medium text-gray-600 mb-3">Pilih Room:</p>
      <div className="flex flex-wrap gap-2">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => onSelect(room)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === room
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
}