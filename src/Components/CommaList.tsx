interface CommaListProps {
    items: string[];
  }
  
  const CommaList: React.FC<CommaListProps> = ({ items }) => {
    return (
      <p className="text-gray-500 underline bg-white p-2">
        {items.join(", ")}
      </p>
    );
  };
  
  export default CommaList;
  