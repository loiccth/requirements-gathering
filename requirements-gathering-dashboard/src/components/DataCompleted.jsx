import React from 'react'
import { Button, Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import AddRequirement from './AddRequirements'

const DataCompleted = () => {
    const [data, setData] = React.useState([])

    const columns = [
        { field: 'firstname', headerName: 'First Name', headerAlign: 'center', width: 150 },
        { field: 'lastname', headerName: 'Last Name', headerAlign: 'center', width: 150 },
        { field: 'description', headerName: 'Description', headerAlign: 'center', flex: 1 },
        {
            field: 'priority', headerName: 'Priority', headerAlign: 'center', width: 80,
            renderCell: (params) => {
                if (params.value >= 75)
                    return <Typography variant='body2' sx={{ backgroundColor: 'crimson', color: 'white', borderRadius: '10px', width: '35px', py: 1, textAlign: 'center' }}>{params.value}</Typography>
                else if (params.value >= 50)
                    return <Typography variant='body2' sx={{ backgroundColor: 'goldenrod', color: 'white', borderRadius: '10px', width: '35px', py: 1, textAlign: 'center' }}>{params.value}</Typography>
                else if (params.value >= 25)
                    return <Typography variant='body2' sx={{ backgroundColor: 'mediumseagreen', color: 'white', borderRadius: '10px', width: '35px', py: 1, textAlign: 'center' }}>{params.value}</Typography>
                else if (params.value < 25)
                    return <Typography variant='body2' sx={{ backgroundColor: 'gray', color: 'white', borderRadius: '10px', width: '35px', py: 1, textAlign: 'center' }}>{params.value}</Typography>
            }
        },
        {
            field: 'moscow', headerName: 'MOSCOW', headerAlign: 'center', width: 150, valueGetter: (params) => {
                if (params.row.moscow === 1) return 'Must Have'
                else if (params.row.moscow === 2) return 'Should Have'
                else if (params.row.moscow === 3) return 'Could Have'
                else if (params.row.moscow === 4) return 'Won\'t Have'
            },
            sortComparator: (v1, v2, param1, param2) => {
                return param1.api.getRow(param1.id).moscow - param2.api.getRow(param2.id).moscow
            },
            renderCell: (params) => {
                if (params.value === 'Must Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'crimson', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Should Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'goldenrod', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Could Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'mediumseagreen', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Won\'t Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'gray', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        },
        {
            field: 'createdAt', headerName: 'Created Date', headerAlign: 'center', width: 180, valueGetter: (params) => {
                return new Date(params.row.createdAt).toLocaleString()
            },
            renderCell: (params) => {
                return <Typography variant='body2' sx={{ border: '1px solid black', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        },
        {
            field: 'status', headerName: 'Status', headerAlign: 'center', width: 110, valueGetter: (params) => {
                if (params.row.status === 'completed') return 'Completed'
                else if (params.row.status === 'inprogress') return 'In Progress'
                else if (params.row.status === 'obsolete') return 'Obsolete'
            },
            renderCell: (params) => {
                if (params.value === 'Completed')
                    return <Typography variant='body2' sx={{ backgroundColor: 'green', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'In Progress')
                    return <Typography variant='body2' sx={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Obsolete')
                    return <Typography variant='body2' sx={{ backgroundColor: 'pink', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        },
        {
            field: 'testcase', headerName: 'Test Case', headerAlign: 'center', width: 150, sortable: false, renderCell: (params) => {
                return <Button variant='contained' onClick={() => {
                    window.open(`${process.env.REACT_APP_API}requirements/img/${params.row.id}`)
                }}>View</Button>
            }
        },
    ]

    React.useEffect(() => {
        handleUpdate()
    }, [])

    const handleUpdate = () => {
        axios.get(`${process.env.REACT_APP_API}requirements/completed`)
            .then(result => {
                const temp = []

                for (let i = 0; i < result.data.length; i++) {
                    temp.push({
                        id: result.data[i]._id,
                        firstname: result.data[i].firstname,
                        lastname: result.data[i].lastname,
                        description: result.data[i].description,
                        priority: result.data[i].priority,
                        moscow: result.data[i].moscow,
                        status: result.data[i].status,
                        createdAt: result.data[i].createdAt,
                        updatedAt: result.data[i].updatedAt,
                    })
                }

                setData(temp)
            })
            .catch(err => console.log(err.response.data.error))
    }

    return (
        <>
            <AddRequirement handleUpdate={handleUpdate} />
            {data.length !== 0 &&
                <Container sx={{ mt: 4 }} maxWidth="xl">
                    <Paper>
                        <div style={{ height: '75vh', width: '100%' }}>
                            <DataGrid rows={data} columns={columns} disableSelectionOnClick autoPageSize />
                        </div>
                    </Paper>
                </Container>
            }
        </>
    )
}

export default DataCompleted