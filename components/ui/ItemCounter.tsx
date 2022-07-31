import {Box, IconButton, Typography} from "@mui/material";
import {AddCircleOutline, RemoveCircleOutline} from "@mui/icons-material";
import {FC} from "react";

interface Props {
  currentValue: number;
  updateQuantity: (newValue: number) => void;
  maxValue: number;
}

export const ItemCounter :FC<Props> = ( {currentValue, updateQuantity, maxValue}) => {

  const localUpdateQuantity = (isSum: boolean) => {
    if (isSum) 
    { currentValue <= maxValue && updateQuantity(currentValue + 1)} 
    else 
    { currentValue !== 1 && updateQuantity(currentValue - 1 )}
  }

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={ () => localUpdateQuantity(false) }>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign:'center'}}>{currentValue < 1 ? 1 : currentValue}</Typography>
      <IconButton onClick={() => localUpdateQuantity(true)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}