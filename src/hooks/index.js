import { useState, useEffect, useMemo } from 'react';
import { reduceData } from '../utils';
import { getData, editData } from '../utils/service';

const useHomepage = () => {
  const [data, setData] = useState({
    companies: [],
    animals: [],
    products: [],
  });
  const [show, setShow] = useState({
    companies: true,
    animals: false,
    products: false,
  });
  const [starredCount, setStarredCount] = useState(0);
  const [starredItems, setStarredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleShow = (val) => () => {
    setShow({
      ...show,
      [val]: !show[val],
    });
  };

  useMemo(() => {
    getData()
      .then((response) => {
        setData(reduceData(response));
        const starred = response.filter((itm) => Boolean(itm.starred));
        setStarredItems(starred);
        setStarredCount(starred.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleFaved = (id, opts) => () => {
    let favedItem = opts.filter((opt) => opt.id === id).shift();
    favedItem.starred = !favedItem.starred;
    editData(id, favedItem).finally(() => {
      setIsLoading(true);
      getData()
        .then((response) => {
          setData(reduceData(response));
          const starred = response.filter((itm) => Boolean(itm.starred));
          setStarredItems(starred);
          setStarredCount(starred.length);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  return {
    data,
    starredCount,
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
