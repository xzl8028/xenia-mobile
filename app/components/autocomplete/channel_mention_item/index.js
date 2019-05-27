// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {General} from 'xenia-redux/constants';

import {getChannel} from 'xenia-redux/selectors/entities/channels';

import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import {getChannelNameForSearchAutocomplete} from 'app/selectors/channel';

import ChannelMentionItem from './channel_mention_item';

import {getUser} from 'xenia-redux/selectors/entities/users';

function mapStateToProps(state, ownProps) {
    const channel = getChannel(state, ownProps.channelId);
    const displayName = getChannelNameForSearchAutocomplete(state, ownProps.channelId);

    let isBot = false;
    if (channel.type === General.DM_CHANNEL) {
        const teammate = getUser(state, channel.teammate_id);
        if (teammate && teammate.is_bot) {
            isBot = true;
        }
    }

    return {
        displayName,
        name: channel.name,
        type: channel.type,
        isBot,
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(ChannelMentionItem);
