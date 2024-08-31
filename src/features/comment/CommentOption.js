import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { deleteComment } from './commentSlice';

export default function CommentOption({comment}) {

const [openModalComment,setOpenModalComment]= useState(false)
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

const handleOpenDelete = () => {
    setOpenModalComment(true)
    handleClose()
}
const handleCloseDelete = () => {
    setOpenModalComment(false)
}

const dispatch = useDispatch()

const handleDelete = () => {
    dispatch(deleteComment({ commentID : comment._id , postID : comment.post}))
    console.log(comment._id, comment.post)
    handleCloseDelete()
}
  
  return (
    <div>
       <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenDelete} >Delete Comment</MenuItem>
        
      </Menu>
      <Modal
        open={openModalComment}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Are you sure you want to delete this post?
        </Typography>
        <Button onClick={handleDelete} variant="contained" color="primary" sx={{marginTop:"10px"}} fullWidth >
            YES
        </Button>
        <Button onClick={handleCloseDelete} variant="contained" color="error" sx={{marginTop:"10px"}} fullWidth >
            NO
        </Button>
      </Box> 
      </Modal>
    </div>
    
  );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
