// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {sendPasswordResetEmail} from 'xenia-redux/actions/users';
import ForgotPassword from './forgot_password';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            sendPasswordResetEmail,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(ForgotPassword);
