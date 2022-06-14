import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MasonryImageList() {
  return (
    <Box sx={{
         width: '100%', 
         height: 300,
         overflowY: 'scroll' 
    }}>
      <ImageList variant="masonry" cols={4} gap={2}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/52d159121302647.60c2db0fa736e.gif',
    title: 'Bed',
  },
  {
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/dcf6e7121302647.60c2db100bdb8.gif',
    title: 'Books',
  },
  {
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/566a2d121302647.60c2db106a095.gif',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Kitchen',
  },
  {
    img: '/assets/collectables/collec_1.png',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://i.pinimg.com/564x/8c/22/4c/8c224c88cbfcf226e3ee5d215e4930fa.jpg',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];