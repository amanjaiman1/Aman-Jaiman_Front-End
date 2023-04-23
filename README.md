
# 1) Explain what the simple List component does.

>The List component is a functional component that utilizes the useState and useEffect hooks to manage the state of the component. Specifically, useState is used to define the selectedIndex state variable, which keeps track of the currently selected item in the list, while useEffect is used to reset the selected index to null whenever the items prop changes.

>The List component maps over the items prop, which is an array of items, and renders a SingleListItem component for each item in the list. The SingleListItem component is a memoized functional component that receives props for the item's index, selected state, text, and click event handler.

>The SingleListItem component renders an li element with the text prop as its content. The element's background color is determined by the value of the isSelected prop, which is true when the item is selected. The onClick event of the li element calls the onClickHandler prop with the index of the item as an argument, which updates the selectedIndex state variable in the List component.

Overall, the List component provides a straightforward implementation of a list with selectable items in React. By utilizing the useState and useEffect hooks, it manages the state of the component in a concise and efficient manner, while the SingleListItem component allows for easy customization and reuse of the list item rendering.

# 2) What problems / warnings are there with code?
Ans: There are multiple problems/warnings with the code that are to be rectified to render the component correctly.

#### 1. The declaration of the items prop in the WrappedListComponent component is incorrect and will result in a TypeError. PropTypes.shapeOf is not a valid function and should be replaced with PropTypes.arrayOf(PropTypes.shape({text: PropTypes.string.isRequired})).


#### 2. The onClickHandler property in the WrappedSingleListItem component is not being called correctly. It should be passed as a callback function to be triggered when the list item is clicked.


#### 3. The default value of null for the items prop in the WrappedListComponent component could cause issues when attempting to perform mapping operations on it. It's better to set it to an empty array ([]) to avoid these problems.



#### 4. The isSelected property in the WrappedSingleListItem component is not being set correctly. As it stands, all list items will be green when selectedIndex is truthy. To fix this, isSelected should be set to isSelected = (selectedIndex === index).


            
#### 5. There is a TypeError that occurs when attempting to set the selectedIndex state in the WrappedListComponent component. The array returned by useState is not destructured correctly, and the setSelectedIndex function is not defined properly. To fix this, the array should be destructured, and setSelectedIndex should appear first: const [setSelectedIndex, selectedIndex] = useState(null);



#### 6. The key prop is not being set correctly in the map function of the WrappedListComponent component. Each child component created by the map function should have a unique key prop to help React keep track of which elements have changed. This can be fixed by adding key={index} to the SingleListItem component.



# 3) Please fix, optimize, and/or modify the component as much as you think is necessary.
            
The Optimized Code is below <br><br>

<pre>
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
</pre>
