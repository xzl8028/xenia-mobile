// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getTheme, get as getPreference} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {savePreferences} from 'xenia-redux/actions/preferences';
import Preferences from 'xenia-redux/constants/preferences';

import ClockDisplay from './clock_display';

function mapStateToProps(state) {
    const militaryTime = getPreference(state, Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time') || 'false';
    const currentUserId = getCurrentUserId(state);

    return {
        userId: currentUserId,
        theme: getTheme(state),
        militaryTime,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClockDisplay);
