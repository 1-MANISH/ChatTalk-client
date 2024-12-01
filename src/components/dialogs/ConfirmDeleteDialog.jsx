import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open,closeHandler,deleteHandler,groupName}) => {
  return (
    <Dialog
        open={open}
        onClose={closeHandler}
    >
        <DialogTitle variant='h5'>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText variant='body1'>Are you sure you want to delete <b>{groupName}</b> group ?</DialogContentText>

        </DialogContent>

        <DialogActions>
            <Button 
                onClick={deleteHandler}
                color='error'
            >
                Delete
            </Button>
            <Button 
                onClick={closeHandler}
            >
                Cancel
            </Button>
        </DialogActions>

    </Dialog>
  )
}

export default ConfirmDeleteDialog