import { useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import styles from '../../styles/components/ProductList.module.css';

const subFilterList = [
  {
    id: "recommended",
    value: "RECOMMENDED",
  },
  {
    id: "new",
    value: "NEWEST FIRST"
  },
  {
    id: "popular",
    value: "POPULAR",
  },
  {
    id: "high",
    value: "PRICE: HIGH TO LOW",
  },
  {
    id: "low",
    value: "PRICE: LOW TO HIGH",
  }
];

const FilterHeader = (props) => {
  const {
    itemCount,
    toggleMainFilter,
    isMainFilterShowing,
    subfilterSelected,
    setSubFilterSelcted
  } = props;

  const [isSubFilterShowing, setIsSubFilterShowing] = useState(false);

  const toggleSubFilter = () => {
    setIsSubFilterShowing(!isSubFilterShowing);
  };

  const handleSubFilter = value => {
    setSubFilterSelcted(value);
    setIsSubFilterShowing(false);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterOptions}>
        <p className={styles.itemsCount}>{itemCount} ITEMS</p>
        <p onClick={toggleMainFilter} className={styles.filterToggleBtn}>
          {isMainFilterShowing ? (
            <>
              <MdOutlineKeyboardArrowLeft /> HIDE FILTER
            </>
          ) : (
            <>
              <MdKeyboardArrowRight /> SHOW FILTER
            </>
          )}
        </p>
      </div>

      <div onClick={toggleMainFilter} className={styles.filterOptionsMobile}>
        <p>FILTER</p>
      </div>

      <p onClick={toggleSubFilter} className={styles.subFilter}>
        {subfilterSelected} <MdKeyboardArrowDown />
      </p>
      {isSubFilterShowing && (
        <div className={styles.subFilterOptions}>
          {subFilterList.map((each) => (
            <p
              className={`${styles.subFilterOption} ${subfilterSelected === each.value ? styles.selectedSubFilter : ''}`}
              onClick={() => handleSubFilter(each.value)}
              key={each.id}
            >
              {subfilterSelected === each.value && <TiTick fontSize={24} />}
              {each.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterHeader;