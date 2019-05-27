// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {shallow} from 'enzyme';

import {
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import Preferences from 'mattermost-redux/constants/preferences';

import PostAttachmentOpenGraph from './post_attachment_opengraph';

describe('PostAttachmentOpenGraph', () => {
    const openGraphData = {
        site_name: 'Xenia',
        title: 'Title',
        url: 'https://xenia.com/',
        images: [{
            secure_url: 'https://www.xenia.org/wp-content/uploads/2016/03/logoHorizontal_WS.png',
        }],
    };
    const baseProps = {
        actions: {
            getOpenGraphMetadata: jest.fn(),
        },
        deviceHeight: 600,
        deviceWidth: 400,
        imagesMetadata: {
            'https://www.xenia.org/wp-content/uploads/2016/03/logoHorizontal_WS.png': {
                width: 1165,
                height: 265,
            },
        },
        isReplyPost: false,
        link: 'https://xenia.com/',
        navigator: {},
        theme: Preferences.THEMES.default,
    };

    test('should match snapshot, without image and description', () => {
        const wrapper = shallow(
            <PostAttachmentOpenGraph {...baseProps}/>
        );

        // should return null
        expect(wrapper.getElement()).toMatchSnapshot();

        wrapper.setProps({openGraphData});
        expect(wrapper.getElement()).toMatchSnapshot();
        expect(wrapper.find(TouchableOpacity).exists()).toEqual(true);
    });

    test('should match snapshot, without site_name', () => {
        const newOpenGraphData = {
            title: 'Title',
            url: 'https://xenia.com/',
        };
        const wrapper = shallow(
            <PostAttachmentOpenGraph
                {...baseProps}
                openGraphData={newOpenGraphData}
            />
        );
        expect(wrapper.getElement()).toMatchSnapshot();
    });

    test('should match snapshot, without title and url', () => {
        const wrapper = shallow(
            <PostAttachmentOpenGraph
                {...baseProps}
                openGraphData={{}}
            />
        );
        expect(wrapper.getElement()).toMatchSnapshot();
    });

    test('should match state and snapshot, on renderImage', () => {
        const wrapper = shallow(
            <PostAttachmentOpenGraph {...baseProps}/>
        );

        // should return null
        expect(wrapper.instance().renderImage()).toMatchSnapshot();
        expect(wrapper.state('hasImage')).toEqual(false);
        expect(wrapper.find(Image).exists()).toEqual(false);
        expect(wrapper.find(TouchableWithoutFeedback).exists()).toEqual(false);

        const images = [{height: 440, width: 1200, url: 'https://xenia.com/logo.png'}];
        const openGraphDataWithImage = {...openGraphData, images};
        wrapper.setProps({openGraphData: openGraphDataWithImage});

        expect(wrapper.instance().renderImage()).toMatchSnapshot();
        expect(wrapper.state('hasImage')).toEqual(true);
        expect(wrapper.find(Image).exists()).toEqual(true);
        expect(wrapper.find(TouchableWithoutFeedback).exists()).toEqual(true);
    });

    test('should match state and snapshot, on renderDescription', () => {
        const wrapper = shallow(
            <PostAttachmentOpenGraph
                {...baseProps}
                openGraphData={openGraphData}
            />
        );

        // should return null
        expect(wrapper.instance().renderDescription()).toMatchSnapshot();

        const openGraphDataWithDescription = {...openGraphData, description: 'Description'};
        wrapper.setProps({openGraphData: openGraphDataWithDescription});
        expect(wrapper.instance().renderDescription()).toMatchSnapshot();
    });

    test('should match result on getFilename', () => {
        const wrapper = shallow(
            <PostAttachmentOpenGraph {...baseProps}/>
        );

        const testCases = [
            {link: 'https://xenia.com/image.png', result: 'og-image.png'},
            {link: 'https://xenia.com/image.jpg', result: 'og-image.jpg'},
            {link: 'https://xenia.com/image', result: 'og-image.png'},
        ];

        testCases.forEach((testCase) => { // eslint-disable-line max-nested-callbacks
            expect(wrapper.instance().getFilename(testCase.link)).toEqual(testCase.result);
        });
    });
});
