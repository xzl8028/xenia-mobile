// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LoginActions from 'app/actions/views/login';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getConfig, getLicense} from 'xenia-redux/selectors/entities/general';

import {login} from 'xenia-redux/actions/users';

import Login from './login.js';

function mapStateToProps(state) {
    const {login: loginRequest} = state.requests.users;
    const config = getConfig(state);
    const license = getLicense(state);
    return {
        ...state.views.login,
        loginRequest,
        config,
        license,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...LoginActions,
            login,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
