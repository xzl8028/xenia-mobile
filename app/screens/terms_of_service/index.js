// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getTermsOfService, logout, updateMyTermsOfServiceStatus} from 'xenia-redux/actions/users';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import TermsOfService from './terms_of_service.js';

function mapStateToProps(state) {
    const config = getConfig(state);

    return {
        siteName: config.SiteName,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getTermsOfService,
            logout,
            updateMyTermsOfServiceStatus,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfService);
