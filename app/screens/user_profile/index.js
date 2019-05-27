// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setChannelDisplayName} from 'app/actions/views/channel';
import {makeDirectChannel} from 'app/actions/views/more_dms';

import {getTeammateNameDisplaySetting, getTheme, getBool} from 'xenia-redux/selectors/entities/preferences';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import Preferences from 'xenia-redux/constants/preferences';
import {loadBot} from 'xenia-redux/actions/bots';
import {getBotAccounts} from 'xenia-redux/selectors/entities/bots';

import {isTimezoneEnabled} from 'app/utils/timezone';

import UserProfile from './user_profile';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const {createChannel: createChannelRequest} = state.requests.channels;
    const militaryTime = getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');
    const enableTimezone = isTimezoneEnabled(state);

    return {
        config,
        createChannelRequest,
        currentDisplayName: state.views.channel.displayName,
        user: state.entities.users.profiles[ownProps.userId],
        bot: getBotAccounts(state)[ownProps.userId],
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
        enableTimezone,
        militaryTime,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            makeDirectChannel,
            setChannelDisplayName,
            loadBot,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
