import { ListItemIcon, MenuItem } from "@mui/material";
interface Prop {
    fieldName: string;
    children: React.ReactNode; 
};

const ListMenu = ({
    fieldName, 
    children
}:Prop) => {
    return (
         <MenuItem>
          <ListItemIcon>
             {children}
          </ListItemIcon>
          { fieldName }
         </MenuItem>
    )
}

export default ListMenu;