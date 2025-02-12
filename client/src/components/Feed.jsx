function Feed({ title, link, date, source }) {
    return (
      <div className="p-4 border-b hover:bg-gray-50 transition-colors">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(date).toLocaleDateString()} - {source}
        </p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Read More →
        </a>
      </div>
    )
  }
  
  export default Feed