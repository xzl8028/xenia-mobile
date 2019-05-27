// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getMissingProfilesByIds} from 'xenia-redux/actions/users';
import {makeGetReactionsForPost} from 'xenia-redux/selectors/entities/posts';
import {getCurrentUserId, makeGetProfilesByIdsAndUsernames} from 'xenia-redux/selectors/entities/users';
import {getTeammateNameDisplaySetting, getTheme} from 'xenia-redux/selectors/entities/preferences';

import {getUniqueUserIds} from 'app/utils/reaction';

import ReactionList from './reaction_list';

function makeMapStateToProps() {
    const getReactionsForPostSelector = makeGetReactionsForPost();
    const getProfilesByIdsAndUsernames = makeGetProfilesByIdsAndUsernames();

    return function mapStateToProps(state, ownProps) {
        const reactions = getReactionsForPostSelector(state, ownProps.postId);
        const allUserIds = getUniqueUserIds(reactions);

        return {
            currentUserId: getCurrentUserId(state),
            reactions,
            teammateNameDisplay: getTeammateNameDisplaySetting(state),
            theme: getTheme(state),
            userProfiles: getProfilesByIdsAndUsernames(state, {allUserIds}) || [],
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getMissingProfilesByIds,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ReactionList);
