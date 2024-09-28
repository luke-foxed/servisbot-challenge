import { Stack, TextField, styled } from '@mui/material'

export const StyledStack = styled(Stack)(({ theme }) => ({
  boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.15)',
  background: '#fff',
  padding: '20px',
  borderRadius: '20px',
}))

export const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: '160px',
  width: 'auto',
  backgroundColor: '#fff',
  borderRadius: '20px',
  border: `2px solid ${theme.palette.primary.main}`,
  fieldset: {
    border: 'none',
  },
  svg: {
    color: theme.palette.primary.main,
  },
  '& .MuiFormLabel-root': {
    marginTop: '-10px', // fixes label clipping with above border styles
  },
  '& .MuiAutocomplete-input': {
    padding: '2.5px 4px 0px 8px !important',
  },
}))
