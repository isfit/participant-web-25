import React from 'react';
import './Dropdown.css';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';

type MenuItemType = 'label' | 'item' | 'separator';

interface MenuItemProps {
    type: MenuItemType;
    content?: string;
    onSelect?: () => void;
}

interface DropdownProps {
    triggerText: string;
    menuItems: MenuItemProps[];
    onItemSelected: (content: string) => void;
}


const Dropdown: React.FC<DropdownProps> = ({ triggerText, menuItems }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{triggerText}</button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dropdownContent">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === 'label' && <DropdownMenuLabel>{item.content}</DropdownMenuLabel>}
            {item.type === 'item' && <DropdownMenuItem className="dropdownItem" onSelect={item.onSelect}>{item.content}</DropdownMenuItem>}
            {item.type === 'separator' && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;