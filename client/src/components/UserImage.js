import { Box } from '@mui/material'
import React from 'react'

const UserImage = ({ image, size="60px"}) => {
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  return (
    <Box width={size} height={size}>
        <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            width={size}
            height={size}
            alt="user"
            src={`${REACT_APP_HOST}/assets/${image}`}
        />
    </Box>
  )
}

export default UserImage