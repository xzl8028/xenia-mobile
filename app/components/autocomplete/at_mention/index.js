// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {autocompleteUsers} from 'xenia-redux/actions/users';
import {getCurrentChannelId, getDefaultChannel} from 'xenia-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';

import {
    filterMembersInChannel,
    filterMembersNotInChannel,
    filterMembersInCurrentTeam,
    getMatchTermForAtMention,
} from 'app/selectors/autocomplete';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import AtMention from './at_mention';

function mapStateToProps(state, ownProps) {
    const {cursorPosition, isSearch} = ownProps;
    const currentChannelId = getCurrentChannelId(state);

    const value = ownProps.value.substring(0, cursorPosition);
    const matchTerm = getMatchTermForAtMention(value, isSearch);

    let teamMembers;
    let inChannel;
    let outChannel;
    if (isSearch) {
        teamMembers = filterMembersInCurrentTeam(state, matchTerm);
    } else {
        inChannel = filterMembersInChannel(state, matchTerm);
        outChannel = filterMembersNotInChannel(state, matchTerm);
    }

    return {
        currentChannelId,
        currentTeamId: getCurrentTeamId(state),
        defaultChannel: getDefaultChannel(state),
        matchTerm,
        teamMembers,
        inChannel,
        outChannel,
        requestStatus: state.requests.users.autocompleteUsers.status,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            autocompleteUsers,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AtMention);
