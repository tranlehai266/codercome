import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, editPost } from './postSlice';
import { useState } from 'react';
import { Box, Modal, Typography, alpha } from '@mui/material';
import { FTextField, FUploadImage, FormProvider } from '../../components/form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';


export default function PostOption({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
 

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
  
  const { isLoading } = useSelector((state) => state.post);

  const defaultValues = {
    content : post.content,
    image : post.image,
    id : post._id
  };

  const methods = useForm({
    defaultValues
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  )

  const onSubmit = (data) => {
    dispatch(editPost(data))
    console.log(data)
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
        <MenuItem onClick={handleOpenModal}>Edit Post</MenuItem>
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
      <Box style={style}> 
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'white',
                p: 3,
                borderRadius: '8px',
              }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign:"center" }}>
            Edit Post
      </Typography>
      <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Edit post is here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
      />
        <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Save Changes
          </LoadingButton>
      </Box>
      </FormProvider>
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
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};