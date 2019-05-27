// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {handleRemoveChannelMembers} from 'app/actions/views/channel_members';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentChannel, canManageChannelMembers} from 'xenia-redux/selectors/entities/channels';
import {makeGetProfilesInChannel} from 'xenia-redux/selectors/entities/users';
import {getProfilesInChannel, searchProfiles} from 'xenia-redux/actions/users';

import ChannelMembers from './channel_members';

function makeMapStateToProps() {
    const getChannelMembers = makeGetProfilesInChannel();

    return (state) => {
        const currentChannel = getCurrentChannel(state);
        let currentChannelMembers = [];
        if (currentChannel.id) {
            currentChannelMembers = getChannelMembers(state, currentChannel.id, true);
        }

        const canManageUsers = canManageChannelMembers(state) && !currentChannel.group_constrained;

        return {
            canManageUsers,
            currentChannelId: currentChannel.id,
            currentChannelMembers,
            currentUserId: state.entities.users.currentUserId,
            theme: getTheme(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesInChannel,
            handleRemoveChannelMembers,
            searchProfiles,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ChannelMembers);
