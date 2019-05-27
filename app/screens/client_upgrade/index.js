// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {logError} from 'xenia-redux/actions/errors';

import {setLastUpgradeCheck} from 'app/actions/views/client_upgrade';
import getClientUpgrade from 'app/selectors/client_upgrade';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import ClientUpgrade from './client_upgrade';

function mapStateToProps(state) {
    const {currentVersion, downloadLink, forceUpgrade, latestVersion, minVersion} = getClientUpgrade(state);

    return {
        currentVersion,
        downloadLink,
        forceUpgrade,
        latestVersion,
        minVersion,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            logError,
            setLastUpgradeCheck,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientUpgrade);
