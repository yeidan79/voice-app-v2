import React from 'react';

const Menu = (props) => {
  return(
    <div className="flex justify-around vh-25 pa4">
      {props.children}
    </div>
  );
}

export default Menu;
