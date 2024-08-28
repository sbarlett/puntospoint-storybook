import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';

import {styled} from '@mui/material/styles';

import clsx from 'clsx';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import {IconButton} from '@mui/material';
import CloseIcon from '../Assets/CloseIcon';

interface ModalProps extends DialogProps {
    onClose: (value: boolean) => void;
    open: boolean;
    children: React.ReactNode;
    hideCloseButton?: boolean;
}

const ModalRoot = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 0px 40px rgba(12, 40, 84, 0.17)',
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
        color: 'inherit',
        maxWidth: '900px',
        margin: '32px 16px',
        [theme.breakpoints.up('sm')]: {
            margin: '32px',
        },
    },
}));

const ModalWrapper = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 40px rgba(12, 40, 84, 0.17)',
    borderRadius: '4px',
    padding: '15px 10px 25px 10px',
    minWidth: '200px',
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
        padding: '45px 37px 55px 54px',
    },
}));

const PREFIX_CLASS = 'Modal';
export const ModalClasses = {
    root: `${PREFIX_CLASS}-root`,
    wrapper: `${PREFIX_CLASS}-wrapper`,
    title: `${PREFIX_CLASS}-title`,
    closeButton: `${PREFIX_CLASS}-closeButton`,
};

const Modal = ({open = false, onClose, children, hideCloseButton, title, className, ...props}: ModalProps) => {
    const handleClose = () => onClose(false);
    return (
        <ModalRoot {...props} className={clsx(className, ModalClasses.root)} open={open}>
            <ModalWrapper className={ModalClasses.wrapper}>
                {title && <DialogTitle className={ModalClasses.title}>{title}</DialogTitle>}
                {!hideCloseButton && (
                    <IconButton
                        className={ModalClasses.closeButton}
                        aria-label='Close modal'
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: {
                                xs: '20px',
                                lg: '40px',
                            },
                            top: {
                                xs: '24px',
                                lg: '54px',
                            },
                            color: '#111111',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                {children}
            </ModalWrapper>
        </ModalRoot>
    );
};

export default Modal;
