import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Snack from './Snack'

const TestCaseModal = ({ id, handleUpdate }) => {
    const [open, setOpen] = React.useState(false)
    const [file, setFile] = React.useState()
    const [snack, setSnack] = React.useState({
        open: false,
        type: 'info',
        msg: ''
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '5px',
        p: 2,
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleConfirm = () => {
        const formData = new FormData()
        if (file) {
            if (file.type.includes('image')) {
                formData.append('img', file)
                axios.patch(`${process.env.REACT_APP_API}requirements/${id}`, formData)
                    .then(() => {
                        setSnack({
                            open: true,
                            type: 'success',
                            msg: 'Success!'
                        })
                        handleUpdate()
                    })
                    .catch(() => {
                        setSnack({
                            open: true,
                            type: 'error',
                            msg: 'Unexpected error occured.'
                        })
                    })
                    .finally(() => {
                        setFile()
                        handleClose()
                    })
            }
            else
                setSnack({
                    open: true,
                    type: 'error',
                    msg: 'Invalid file format.'
                })
        }
        else
            setSnack({
                open: true,
                type: 'error',
                msg: 'No image selected.'
            })
    }

    return (
        <>
            <Snack snack={snack} setSnack={setSnack} />

            <Button variant="contained" color="primary" onClick={handleOpen}>Upload Testcase</Button>

            <Modal
                open={open}
                onClose={() => {
                    setFile()
                    handleClose()
                }}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Upload test case and mark as completed
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button component="label" variant="contained">
                            <input type="file" name="img" id="img" accept="image/*"
                                style={{ display: 'none' }} onChange={handleChange} />
                            Browse
                        </Button>
                        {file &&
                            <Typography variant='p' sx={{ mx: 1 }}>{file.name}</Typography>
                        }
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
                        <Button variant="contained" color="secondary" onClick={() => {
                            setFile()
                            handleClose()
                        }}>Close</Button>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default TestCaseModal