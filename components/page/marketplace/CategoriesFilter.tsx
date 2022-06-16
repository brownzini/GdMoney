//React
import * as React from 'react';

//Material-UI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//Services
import api from '../../../services/api';

type Categories = {
  id: string;
  category_name:string; 
}

type Props = {
  categories: Categories[];
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategoriesFilter({
  categories,
  setCategories,
  setIdCategory,
}:Props) {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function getAllCategories() {
    await api.get('/categories').then(res => {
        setCategories(res.data.categories);
    });
  }

  React.useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {categories.map((category: Categories) => ( 
        <Tab 
            key={category.id} 
            label={category.category_name} 
            onClick={() => setIdCategory(category.id)}
        />
        ))}
      </Tabs>
    </Box>
  );
}