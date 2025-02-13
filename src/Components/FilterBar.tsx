interface FilterBarProps {
    options: string[];
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  }
  
  const FilterBar: React.FC<FilterBarProps> = ({ options, selectedFilters, setSelectedFilters }) => {
    const handleCheckboxChange = (option: string) => {
      setSelectedFilters((prev: string[]) => {
        const updatedFilters = prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option];
  
        return updatedFilters;
      });
    };
  
    return (
      <div className="w-screen bg-white shadow-md p-4 overflow-x-auto whitespace-nowrap no-scrollbar">
        <div className="flex gap-4">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                value={option}
                checked={selectedFilters.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-5 h-5 rounded-md border-gray-300 focus:ring-orange-500 cursor-pointer"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default FilterBar;
  