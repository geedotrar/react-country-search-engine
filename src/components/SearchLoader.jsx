const SearchLoader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-5 h-5 border-2 border-violet-500 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-3 text-sm text-gray-600 font-['SF Pro Text']">Loading...</span>
    </div>
  );
};

export default SearchLoader;
