import { useState, useEffect } from 'react';
import { reduceData } from '../utils';
import { editData, getData } from '../utils/service';

const useHomepage = () => {
  const [data, setData] = useState({
    animals: [],
    companies: [],
    products: [],
  });

  // collapse logic
  const [show, setShow] = useState({
    animals: true,
    companies: false,
    products: false,
  });
  // faved logic
  // Check localStorage
  const [starredItems, setStarredItems] = useState(() => {
    const starred = localStorage.getItem('faved');
    const data = JSON.parse(starred);
    return data || [];
  });

  const [isLoading, setIsLoading] = useState(true);

  const toggleShow = (val) => () => {
    setShow({
      ...show,
      [val]: !show[val],
    });
  };

  useEffect(() => {
    getData(1, 25)
      .then((res) => {
        let data;
        res.forEach((element) => {
          switch (element[0].type) {
            case 'animal':
              data = {
                ...data,
                animals: element,
              };
              break;
            case 'product':
              data = {
                ...data,
                products: element,
              };
              break;
            case 'company':
              data = {
                ...data,
                companies: element,
              };
              break;
            default:
              data = {};
              break;
          }
        });
        setData(data);
        localStorage.setItem('data', JSON.stringify(data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }, []);

  useEffect(() => {
    if (starredItems.length) {
      localStorage.setItem('faved', JSON.stringify(starredItems));
    }
  }, [starredItems]);

  const handleFaved = (id, opts) => () => {
    let favedItem = opts.filter((opt) => opt.id === id).shift();
    favedItem.starred = !favedItem.starred;
    editData(id, favedItem).then((updatedItem) => {
      // Update upper most data;
      // setData((prev) => {
      //   let newState = {
      //     ...prev,
      //   };
      //   switch (updatedItem.type) {
      //     case 'animal':
      //       const oldIndex = data.animals
      //         .map((animal) => animal.id)
      //         .indexOf(updatedItem.id);
      //       newState.animals[oldIndex] = updatedItem;
      //       break;
      //     case 'company':
      //       break;
      //     case 'product':
      //       break;
      //     default:
      //       break;
      //   }
      //   console.log('newState', newState);
      // });
    });
  };

  return {
    data,
    starredItems,
    isLoading,
    handleFaved,
    toggleShow,
    show,
  };
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
