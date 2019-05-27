// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {clearSearch} from 'xenia-redux/actions/search';

import {showSearchModal} from 'app/actions/views/search';

import ChannelSearchButton from './channel_search_button';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearSearch,
            showSearchModal,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(ChannelSearchButton);
