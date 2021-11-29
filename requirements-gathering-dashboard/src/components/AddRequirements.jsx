import React from 'react'
import {
    Box, Button, Container, Typography, Modal, Slider,
    TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Snack from './Snack'

const AddRequirements = ({ handleUpdate }) => {
    const [open, setOpen] = React.useState(false)
    const [snack, setSnack] = React.useState({
        open: false,
        type: 'info',
        msg: ''
    })
    const { register, handleSubmit, errors, reset, control } = useForm({
        defaultValues: {
            priority: 50,
            moscow: 1
        }
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

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_API}requirements`, data)
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
                    msg: 'Error!'
                })
            })
            .finally(() => {
                reset()
                setOpen(false)
            })
    }

    return (
        <>
            <Snack snack={snack} setSnack={setSnack} />

            <Container maxWidth="xl">
                <Box sx={{ my: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Add Requirement</Button>
                </Box>
            </Container>

            <Modal
                open={open}
                onClose={() => {
                    reset()
                    setOpen(false)
                }}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Add new requirement
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ my: 2 }}>
                                <TextField fullWidth label="First name" variant="outlined" {...register("firstname", { required: true })} />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <TextField fullWidth label="Last name" variant="outlined" {...register("lastname", { required: true })} />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <TextField fullWidth label="Description" variant="outlined" multiline rows={4} {...register("description", { required: true })} />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <FormControl>
                                    <InputLabel id="moscow">MOSCOW</InputLabel>
                                    <Controller
                                        name="moscow"
                                        control={control}
                                        render={({ field }) => (
                                            <Select fullWidth labelId="moscow" label="MOSCOW" {...field}>
                                                <MenuItem value={1}>Must Have</MenuItem>
                                                <MenuItem value={2}>Should Have</MenuItem>
                                                <MenuItem value={3}>Could Have</MenuItem>
                                                <MenuItem value={4}>Won't Have</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <InputLabel id="priority">Priority</InputLabel>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Slider
                                            {...field}
                                            valueLabelDisplay="auto"
                                            min={1}
                                            max={100}
                                            label="Priority"
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    reset()
                                    setOpen(false)
                                }}>Close</Button>
                                <Button variant="contained" color="primary" type="submit">Add</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default AddRequirements