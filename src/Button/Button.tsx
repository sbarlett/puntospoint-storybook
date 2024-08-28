import React from 'react';
import {Button} from '@mui/material';

interface Props {
    text: string
}
export default function ButtonStore(props: Props) {
    return <Button variant='contained'>{props.text}</Button>;
}
