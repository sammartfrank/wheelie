import { useState } from 'react';

const useHomepage = () => {
  return {};
};

const useSearch = (data) => {
  const [selectedValue, setSelectedValue] = useState('all');
  const [showOptions, setShowOptions] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeOption, setActiveOption] = useState(0);

  const handleSelectChange = (e) => {
    const val = e.currentTarget.value;
    setSelectedValue(val);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(true);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === filteredItems.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  const handleOnChange = (e) => {
    const query = e.currentTarget.value;
    if (!query.length) {
      setFilteredItems([]);
      setShowOptions(false);
      return;
    }
    if (selectedValue === 'all') {
      const allItems = Object.values(data).flat();
      const filtered = allItems.filter((item) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
      setFilteredItems(filtered);
      setShowOptions(true);
      return;
    }
    const filtered = data[selectedValue].filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    setFilteredItems(filtered);
    setShowOptions(true);
  };
  return {
    handleKeyDown,
    handleOnChange,
    handleSelectChange,
    showOptions,
    filteredItems,
  };
};

export { useHomepage, useSearch };
