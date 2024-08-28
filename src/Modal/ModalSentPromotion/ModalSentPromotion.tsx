import React from 'react';
import {Box, CardContent, Divider, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import Modal, {ModalClasses} from '../Modal';

interface Props {
    open: boolean;
    onClose: () => void;
    promotion: any[];
}

const ModalSentPromotion = (props: Props) => {
    return (
        <ModalStyled open={props.open} onClose={props.onClose} title='Promociones enviadas'>
            <Container>
                <CardWrapper>
                    {props.promotion.map(promo => (
                        <CardBox key={promo.id}>
                            <Box>
                                <ImageMedia>
                                    <img
                                        src={promo.image}
                                        alt={promo.text}
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                </ImageMedia>
                                <Title>{promo.text}</Title>
                            </Box>

                            <Box>
                                <Divider sx={{width: '100%', marginBottom: '27px'}} />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alingItems: 'center',
                                    }}
                                >
                                    <Discount>{promo.discount}</Discount>
                                    <Price color='primary'>{promo.price}</Price>
                                </Box>
                            </Box>
                        </CardBox>
                    ))}
                </CardWrapper>
            </Container>
        </ModalStyled>
    );
};
export default ModalSentPromotion;

const ModalStyled = styled(Modal)(() => ({
    '& .MuiPaper-root': {
        maxWidth: '800px',
        width: '100%',
        overflow: 'hidden',
    },
    [`& .${ModalClasses.closeButton}`]: {
        top: '30px',
    },
    [`& .${ModalClasses.wrapper}`]: {
        padding: '30px',
    },
    [`& .${ModalClasses.title}`]: {
        textAlign: 'center',
        padding: '0px 20px',
        fontSize: '24px',
        color: '#111',
        lineHeight: '35px',
    },
}));

const Container = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    overflowY: 'auto',
}));

const CardWrapper = styled(Box)(({theme}) => ({
    margin: '30px 0px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
    maxHeight: '400px',
    [theme.breakpoints.up('xl')]: {
        maxHeight: '80 0px',
    },
}));

const CardBox = styled(CardContent)(() => ({
    width: '287px',
    height: '335px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '13px 22px',
    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
}));

export const Title = styled(Typography)(() => ({
    color: '#363537',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.15,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    marginTop: 30,
}));

export const Discount = styled(Typography)(() => ({
    fontWeight: 400,
    fontSize: 16,
    color: '#363537',
    lineHeight: '16px',
    letterSpacing: 0.4,
    textDecorationLine: 'line-through',
}));

export const Price = styled(Typography)(() => ({
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '20px',
    letterSpacing: 0.15,
}));

export const ImageMedia = styled('div')(() => ({
    position: 'relative',
    height: 153,
    width: '100%',
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
}));
