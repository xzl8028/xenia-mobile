// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getSupportedTimezones} from 'xenia-redux/selectors/entities/general';

import SelectTimezone from './select_timezone';

function mapStateToProps(state, props) {
    const {selectedTimezone} = props;
    const supportedTimezones = getSupportedTimezones(state);

    let index = 0;

    const timezoneIndex = supportedTimezones.findIndex((timezone) => timezone === selectedTimezone);
    if (timezoneIndex > 0) {
        index = timezoneIndex;
    }

    return {
        theme: getTheme(state),
        timezones: supportedTimezones,
        initialScrollIndex: index,
    };
}

export default connect(mapStateToProps)(SelectTimezone);
