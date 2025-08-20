const SearchResultsFooter = () => {
  return (
    <footer className="bg-primary-1 text-white text-xs">
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-center md:text-left">© All Rights Reserved. Fly Cham 2025</p>
        <div className="flex gap-4 text-center md:text-right">
          <a href="#" className="hover:underline">Site Map</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default SearchResultsFooter;
