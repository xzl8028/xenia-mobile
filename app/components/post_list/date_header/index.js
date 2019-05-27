// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getUserCurrentTimezone} from 'xenia-redux/utils/timezone_utils';

import {isTimezoneEnabled} from 'app/utils/timezone';

import DateHeader from './date_header';

function mapStateToProps(state) {
    const enableTimezone = isTimezoneEnabled(state);
    const currentUser = getCurrentUser(state);
    let timeZone = null;

    if (enableTimezone) {
        timeZone = getUserCurrentTimezone(currentUser.timezone);
    }

    return {
        theme: getTheme(state),
        timeZone,
    };
}

export default connect(mapStateToProps)(DateHeader);

