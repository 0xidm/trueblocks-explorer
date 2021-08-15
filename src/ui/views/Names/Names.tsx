import { NamesAddressesLocation, NamesBlocksLocation, NamesSignaturesLocation, NamesTagsLocation } from '../../Routes';
import { Names } from './Tabs/Names';
import { Signatures } from './Tabs/Signatures';
import { Tags } from './Tabs/Tag';
import { When } from './Tabs/When';
import { BaseView } from '@components/BaseView';
import React from 'react';

export const NamesView = () => {
  const title = 'Names';
  const tabs = [
    { name: 'Named Addresses', location: NamesAddressesLocation, component: <Names /> },
    { name: 'Address Tags', location: NamesTagsLocation, component: <Tags /> },
    { name: 'Signatures', location: NamesSignaturesLocation, component: <Signatures /> },
    { name: 'Named Blocks', location: NamesBlocksLocation, component: <When /> },
  ];
  return <BaseView title={title} cookieName={'COOKIE_NAMES'} tabs={tabs} />;
};
