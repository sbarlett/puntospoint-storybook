import React from 'react';
import ModalSentPromotion from './ModalSentPromotion';

const mockPromo = [
    {
        id: '1',
        text: '2x1 en cine',
        price: '19.125',
        discount: '22.500',
        image:
            'https://s3.amazonaws.com/puntospoint-media/events/images/000/014/844/webp/Chinawok_VC01.webp?1710539944',
    },
    {
        id: '2',
        text: '2x1 en cine 2x1 en cine 2x1 en cine',
        price: '19.125',
        discount: '22.500',
        image:
            'https://s3.amazonaws.com/puntospoint-media/events/images/000/015/326/webp/BK____VCD_011.webp?1715119785',
    },
    {
        id: '3',
        text: '2x1 en cine 2x1 en cine 2x1 en cine 2x1 en cine 2x1 en cine 2x1 en cine 2x1 en cine',
        price: '19.125',
        discount: '22.500',
        image:
            'https://s3.amazonaws.com/puntospoint-media/events/images/000/015/326/webp/BK____VCD_011.webp?1715119785',
    },
    {
        id: '4',
        text: '2x1 en cine',
        price: '19.125',
        discount: '22.500',
        image:
            'https://s3.amazonaws.com/puntospoint-media/events/images/000/014/844/webp/Chinawok_VC01.webp?1710539944',
    },
];

export default {
    title: 'Modals/ModalSentPromotion',
    component: ModalSentPromotion,
};

export const Modal = (args: any) => <ModalSentPromotion {...args}/>;

Modal.args = {
   open: true,
   onClose: () => {},
   promotion: mockPromo
};
