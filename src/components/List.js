import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li className="w-1/4 h-10 ml-52 mt-9 items-center border-2-transparent rounded-md list"
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)} //callback is not defined 
      > 
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(); //Modified

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (

    < ul style={{ textAlign: '' }}
      className="text-center ml-96"
    
    >
      {items.map((item, index) => (
        <SingleListItem
          key={index} //Modified
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} //Modified
        />
      ))}

    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ //Modified
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = { //Modified
  items: [
    { text: "SteelEye Assesment" },
    { text: "Aman Jaiman" },
    { text: "12010331" },
    { text: "Lovely Professional University" },
    { text: "B-Tech CSE" },
  ],
};
const List = memo(WrappedListComponent);
export default List;
