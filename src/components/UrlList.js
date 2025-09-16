export default function UrlList({ urls }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Tus enlaces</h2>
      {urls.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No tienes URLs aún.</p>
          <p className="text-sm text-gray-400">Las URLs que acortes aparecerán aquí.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {urls.map((u) => (
            <li key={u.id} className="flex flex-col sm:flex-row sm:justify-between gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <a 
                target="_blank" 
                href={u.original_url} 
                className="text-blue-600 hover:text-blue-800 underline break-all"
                rel="noopener noreferrer"
              >
                {u.original_url}
              </a>
              <a 
                target="_blank" 
                href={process.env.NEXT_PUBLIC_API_BASE_URL + '/' + u.short_code} 
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
                rel="noopener noreferrer"
              >
                /{u.short_code}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
