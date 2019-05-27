// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import DraweSwiper from './drawer_swiper';

function mapStateToProps(state) {
    return {
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps, null, null, {forwardRef: true})(DraweSwiper);
