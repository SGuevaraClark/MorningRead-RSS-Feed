function Feed({ title, link, date, source }) {
  return (
    <div className="p-6 border-b hover:bg-gray-50 transition-all duration-300">
      <h2 className="font-bold text-xl mb-3 text-gray-800 hover:text-gray-600 transition-colors">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">
        {new Date(date).toLocaleDateString()} - {source}
      </p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block text-blue-500 hover:text-blue-700 transition-colors font-medium hover:underline"
      >
        Read More →
      </a>
    </div>
  )
}

export default Feed