// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getPostIdsInChannel} from 'xenia-redux/selectors/entities/posts';
import {getMyChannelMember} from 'xenia-redux/selectors/entities/channels';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {loadPostsIfNecessaryWithRetry, markChannelViewedAndRead} from 'app/actions/views/channel';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import ChannelPeek from './channel_peek';

function mapStateToProps(state, ownProps) {
    const channelId = ownProps.channelId;
    const myMember = getMyChannelMember(state, channelId);

    return {
        channelId,
        currentUserId: getCurrentUserId(state),
        postIds: getPostIdsInChannel(state, channelId),
        lastViewedAt: myMember && myMember.last_viewed_at,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadPostsIfNecessaryWithRetry,
            markChannelViewedAndRead,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPeek);
