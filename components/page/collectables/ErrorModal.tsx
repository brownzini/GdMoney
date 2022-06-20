//React
import * as React from 'react';

//Material-UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//Icons
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '1px solid #cbcbcb',
  boxShadow: 24,
  borderRadius: '2%',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};


interface Props {
  open:boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BasicModal({
  open,
  setOpen,
}:Props) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="error-modal"
      >
        <Box sx={style}> 
            <img src="/assets/img/warning.png" />
            <h2> You do not have a registered wallet to receive </h2>
            <Link
              href="/settings"
              underline="none"
            >
            <Button 
              sx={{
                width: '100%',
              }}
              onClick={() => console.log('kkk')}
              variant="contained" 
              endIcon={<SettingsIcon />}
              >
              go to settings
            </Button>
            </Link>
        </Box>
      </Modal>
    </div>
  );
}