// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getStatusForUserId} from 'xenia-redux/selectors/entities/users';

import UserStatus from './user_status';

function mapStateToProps(state, ownProps) {
    let status = ownProps.status;
    if (!status && ownProps.userId) {
        status = getStatusForUserId(state, ownProps.userId);
    }

    return {
        status,
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(UserStatus);
