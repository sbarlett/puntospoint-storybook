import React from 'react';
import Link from './Button';

export default {
    title: 'Buttons/Button',
    component: Link,
};

export const ButtonStore = (args: any) => <Link {...args}/>;

ButtonStore.args = {
    text: "Text props"
};
