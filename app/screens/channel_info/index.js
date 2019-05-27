// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    favoriteChannel,
    getChannelStats,
    getChannel,
    deleteChannel,
    unfavoriteChannel,
    updateChannelNotifyProps,
} from 'xenia-redux/actions/channels';
import {getCustomEmojisInText} from 'xenia-redux/actions/emojis';
import {selectFocusedPostId} from 'xenia-redux/actions/posts';
import {clearPinnedPosts} from 'xenia-redux/actions/search';
import {General} from 'xenia-redux/constants';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {
    canManageChannelMembers,
    getCurrentChannel,
    getCurrentChannelStats,
    getSortedFavoriteChannelIds,
    getMyCurrentChannelMembership,
    isCurrentChannelReadOnly,
} from 'xenia-redux/selectors/entities/channels';
import {getCurrentUserId, getUser, getStatusForUserId, getCurrentUserRoles} from 'xenia-redux/selectors/entities/users';
import {areChannelMentionsIgnored, getUserIdFromChannelName, isChannelMuted, showDeleteOption, showManagementOptions} from 'xenia-redux/utils/channel_utils';
import {isAdmin as checkIsAdmin, isChannelAdmin as checkIsChannelAdmin, isSystemAdmin as checkIsSystemAdmin} from 'xenia-redux/utils/user_utils';
import {getConfig, getLicense} from 'xenia-redux/selectors/entities/general';

import {
    closeDMChannel,
    closeGMChannel,
    handleSelectChannel,
    leaveChannel,
    loadChannelsByTeamName,
    selectPenultimateChannel,
    setChannelDisplayName,
} from 'app/actions/views/channel';

import ChannelInfo from './channel_info';

function mapStateToProps(state) {
    const config = getConfig(state);
    const license = getLicense(state);
    const currentChannel = getCurrentChannel(state) || {};
    const currentChannelCreator = getUser(state, currentChannel.creator_id);
    const currentChannelCreatorName = currentChannelCreator && currentChannelCreator.username;
    const currentChannelStats = getCurrentChannelStats(state);
    const currentChannelMemberCount = currentChannelStats && currentChannelStats.member_count;
    const currentChannelMember = getMyCurrentChannelMembership(state);
    const currentUserId = getCurrentUserId(state);
    const favoriteChannels = getSortedFavoriteChannelIds(state);
    const isCurrent = currentChannel.id === state.entities.channels.currentChannelId;
    const isFavorite = favoriteChannels && favoriteChannels.indexOf(currentChannel.id) > -1;
    const roles = getCurrentUserRoles(state);
    let canManageUsers = currentChannel.hasOwnProperty('id') ? canManageChannelMembers(state) : false;
    if (currentChannel.group_constrained) {
        canManageUsers = false;
    }
    const currentUser = getUser(state, currentUserId);

    let status;
    let isBot = false;
    if (currentChannel.type === General.DM_CHANNEL) {
        const teammateId = getUserIdFromChannelName(currentUserId, currentChannel.name);
        const teammate = getUser(state, teammateId);
        status = getStatusForUserId(state, teammateId);
        if (teammate && teammate.is_bot) {
            isBot = true;
        }
    }

    const isAdmin = checkIsAdmin(roles);
    const isChannelAdmin = checkIsChannelAdmin(roles);
    const isSystemAdmin = checkIsSystemAdmin(roles);

    const channelIsReadOnly = isCurrentChannelReadOnly(state);
    const canEditChannel = !channelIsReadOnly && showManagementOptions(state, config, license, currentChannel, isAdmin, isSystemAdmin, isChannelAdmin);
    const viewArchivedChannels = config.ExperimentalViewArchivedChannels === 'true';

    return {
        canDeleteChannel: showDeleteOption(state, config, license, currentChannel, isAdmin, isSystemAdmin, isChannelAdmin),
        viewArchivedChannels,
        canEditChannel,
        currentChannel,
        currentChannelCreatorName,
        currentChannelMemberCount,
        currentUserId,
        isChannelMuted: isChannelMuted(currentChannelMember),
        ignoreChannelMentions: areChannelMentionsIgnored(currentChannelMember.notify_props, currentUser.notify_props),
        isCurrent,
        isFavorite,
        status,
        theme: getTheme(state),
        canManageUsers,
        isBot,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearPinnedPosts,
            closeDMChannel,
            closeGMChannel,
            deleteChannel,
            getChannelStats,
            getChannel,
            leaveChannel,
            loadChannelsByTeamName,
            favoriteChannel,
            unfavoriteChannel,
            getCustomEmojisInText,
            selectFocusedPostId,
            updateChannelNotifyProps,
            selectPenultimateChannel,
            setChannelDisplayName,
            handleSelectChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInfo);
