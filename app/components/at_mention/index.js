// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getUsersByUsername} from 'xenia-redux/selectors/entities/users';

import {getTeammateNameDisplaySetting, getTheme} from 'xenia-redux/selectors/entities/preferences';

import AtMention from './at_mention';

function mapStateToProps(state) {
    return {
        theme: getTheme(state),
        usersByUsername: getUsersByUsername(state),
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
    };
}

export default connect(mapStateToProps)(AtMention);
