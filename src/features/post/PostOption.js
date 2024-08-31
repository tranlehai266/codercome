import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from './postSlice';
import { useState } from 'react';
import { Box, Modal, TextField, Typography } from '@mui/material';


export default function PostOption({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [editContent, setEditContent] = useState(post.content)


  const handleOpenModalDelete = () => {
    setOpenDeleteModal(true)
    handleClose()
  }
  const handleCloseModalDelete = () => {
    setOpenDeleteModal(false)
  }

  const handleOpenModal = () => {
    setOpenEditModal(true)
    handleClose()
  }
  const handleEditClose = () => {
    setOpenEditModal(false);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()

  const handleDelete = () => {
    console.log(post._id)
    dispatch(deletePost(( post._id)))
    handleClose()
  }
  
  const handleSaveEdit = () => {
    dispatch(editPost({ id: post._id , updateContent: editContent}))
    setOpenEditModal(false)
  }
  
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >  
        <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
        <MenuItem onClick={handleOpenModal}>Edit Text</MenuItem>
      </Menu>

      <Modal
        open={openDeleteModal}
        onClose={handleCloseModalDelete}
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
        <Button onClick={handleCloseModalDelete} variant="contained" color="error" sx={{marginTop:"10px"}} fullWidth >
            NO
        </Button>
      </Box> 
      </Modal>
      

      <Modal
        open={openEditModal}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Edit Text
        </Typography>
        <TextField 
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
          <Button onClick={handleSaveEdit} variant="contained" color="primary" sx={{marginTop:"10px"}} fullWidth >
            Save
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