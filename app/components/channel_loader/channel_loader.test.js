// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import Preferences from 'xenia-redux/constants/preferences';

import ChannelLoader from './channel_loader';

jest.mock('rn-placeholder', () => ({
    ImageContent: () => {},
}));

describe('ChannelLoader', () => {
    const baseProps = {
        channelIsLoading: true,
        theme: Preferences.THEMES.default,
        actions: {
            handleSelectChannel: jest.fn(),
            setChannelLoading: jest.fn(),
        },
    };

    test('should match snapshot', () => {
        const wrapper = shallow(<ChannelLoader {...baseProps}/>);
        expect(wrapper.getElement()).toMatchSnapshot();
    });
});