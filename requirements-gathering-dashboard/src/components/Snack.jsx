import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Snack = ({ snack, setSnack }) => {
    return (
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={() => setSnack({ open: false, type: 'info', msg: '' })}>
            <MuiAlert elevation={6} variant="filled" onClose={() => setSnack({ open: false, type: 'info', msg: '' })} severity={snack.type} sx={{ width: '100%' }}>
                {snack.msg}
            </MuiAlert>
        </Snackbar>
    )
}

export default Snack