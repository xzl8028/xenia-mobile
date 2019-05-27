// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTeammateNameDisplaySetting, getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getUsers} from 'xenia-redux/selectors/entities/users';

import SelectedUsers from './selected_users';

function mapStateToProps(state) {
    return {
        theme: getTheme(state),
        profiles: getUsers(state),
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
    };
}

export default connect(mapStateToProps)(SelectedUsers);
