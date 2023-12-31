/* eslint-disable react/prop-types */
// EditTruck.jsx
import { useState, useEffect } from 'react'

import {
  InputLabel, MenuItem, FormControl, Select,
  Grid, Button, TextField, Dialog,
  DialogActions, DialogContent, DialogTitle
} from '@mui/material'

export default function FormDialog({
  truck, openModal, handleClose, handleSubmit
}) {
  const [truckType, setTruckType] = useState('')
  const [truckWeight, setTruckWeight] = useState('')
  const [truckWidth, setTruckWidth] = useState('')
  const [truckHeight, setTruckHeight] = useState('')
  const [truckLength, setTruckLength] = useState('')

  useEffect(() => {
    setTruckType(truck?.type)
    setTruckWeight(truck?.payload)
    setTruckWidth(truck?.dimensions?.width)
    setTruckHeight(truck?.dimensions?.height)
    setTruckLength(truck?.dimensions?.length)
  }, [truck])

  const handleChangeSelect = (event) => {
    setTruckType(event.target.value)

    if (event.target.value === 'SPRINTER') {
      setTruckWeight(1700)
      setTruckWidth(210)
      setTruckHeight(210)
      setTruckLength(370)
    } else if (event.target.value === 'SMALL STRAIGHT') {
      setTruckWeight(2500)
      setTruckWidth(240)
      setTruckHeight(220)
      setTruckLength(460)
    } else {
      setTruckWeight(3800)
      setTruckWidth(260)
      setTruckHeight(240)
      setTruckLength(610)
    }
  }

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Edit truck</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={truckType || ''}
                  label='Type'
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={'SPRINTER'}>SPRINTER</MenuItem>
                  <MenuItem value={'SMALL STRAIGHT'}>
                    SMALL STRAIGHT
                  </MenuItem>
                  <MenuItem value={'LARGE STRAIGHT'}>
                    LARGE STRAIGHT
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField required
                id='standard-number' label='Max weight'
                type='number' fullWidth
                value={truckWeight || ''}
                onChange={(e) => setTruckWeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required
                id='standard-number' label='Max width'
                type='number' fullWidth
                value={truckWidth || ''}
                onChange={(e) => setTruckWidth(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required
                id='standard-number' label='Max height'
                type='number' fullWidth
                value={truckHeight || ''}
                onChange={(e) => setTruckHeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField required
                id='standard-number' label='Max length'
                type='number' fullWidth
                value={truckLength || ''}
                onChange={(e) => setTruckLength(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button size='large'
            variant='outlined'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button size='large'
            variant='contained'
            onClick={() => {
              handleSubmit({
                type: truckType,
                payload: truckWeight,
                dimensions: {
                  width: truckWidth,
                  height: truckHeight,
                  length: truckLength
                }
              })
              handleClose()
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}