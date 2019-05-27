// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {selectPost} from 'xenia-redux/actions/posts';
import {makeGetChannel} from 'xenia-redux/selectors/entities/channels';
import {getPost} from 'xenia-redux/selectors/entities/posts';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import {loadThreadIfNecessary} from 'app/actions/views/channel';

import LongPost from './long_post';

function makeMapStateToProps() {
    const getChannel = makeGetChannel();

    return function mapStateToProps(state, ownProps) {
        const post = getPost(state, ownProps.postId);
        const channel = post ? getChannel(state, {id: post.channel_id}) : null;

        return {
            channelName: channel ? channel.display_name : '',
            hasReactions: post ? post.has_reactions : false,
            inThreadView: Boolean(state.entities.posts.selectedPostId),
            fileIds: post ? post.file_ids : false,
            theme: getTheme(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadThreadIfNecessary,
            selectPost,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(LongPost);
