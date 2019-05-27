// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Preferences} from 'xenia-redux/constants';

import {savePreferences} from 'xenia-redux/actions/preferences';
import {updateMe} from 'xenia-redux/actions/users';

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {
    get as getPreference,
    getTheme,
} from 'xenia-redux/selectors/entities/preferences';

import NotificationSettingsEmail from './notification_settings_email';

function mapStateToProps(state) {
    const config = getConfig(state);
    const sendEmailNotifications = config.SendEmailNotifications === 'true';
    const enableEmailBatching = config.EnableEmailBatching === 'true';
    const emailInterval = getPreference(
        state,
        Preferences.CATEGORY_NOTIFICATIONS,
        Preferences.EMAIL_INTERVAL,
        Preferences.INTERVAL_NOT_SET.toString(),
    );

    return {
        enableEmailBatching,
        emailInterval,
        sendEmailNotifications,
        siteName: config.siteName || '',
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
            updateMe,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettingsEmail);
