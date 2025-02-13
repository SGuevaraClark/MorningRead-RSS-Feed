function Feed({ title, link, date, source, content }) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <header className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {source}
            </span>
            <time className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString('es-CR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {title}
            </a>
          </h2>
        </header>
        
        {content && content.trim() !== '' && (
          <div className="mt-3 mb-4">
            <p className="text-gray-600 text-sm line-clamp-3">
              {content}
            </p>
          </div>
        )}

      </div>
    </article>
  )
}

export default Feed