// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {selectFocusedPostId, selectPost} from 'xenia-redux/actions/posts';
import {clearSearch, getRecentMentions} from 'xenia-redux/actions/search';
import {RequestStatus} from 'xenia-redux/constants';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import {loadChannelsByTeamName, loadThreadIfNecessary} from 'app/actions/views/channel';
import {showSearchModal} from 'app/actions/views/search';
import {makePreparePostIdsForSearchPosts} from 'app/selectors/post_list';

import RecentMentions from './recent_mentions';

function makeMapStateToProps() {
    const preparePostIds = makePreparePostIdsForSearchPosts();
    return (state) => {
        const postIds = preparePostIds(state, state.entities.search.results);
        const {recentMentions: recentMentionsRequest} = state.requests.search;
        const isLoading = recentMentionsRequest.status === RequestStatus.STARTED ||
            recentMentionsRequest.status === RequestStatus.NOT_STARTED;

        return {
            postIds,
            isLoading,
            didFail: recentMentionsRequest.status === RequestStatus.FAILURE,
            theme: getTheme(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearSearch,
            loadChannelsByTeamName,
            loadThreadIfNecessary,
            getRecentMentions,
            selectFocusedPostId,
            selectPost,
            showSearchModal,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(RecentMentions);
