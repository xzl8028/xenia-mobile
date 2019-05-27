// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import {setProfileImageUri, removeProfileImage, updateUser} from 'app/actions/views/edit_profile';

import EditProfile from './edit_profile';

function mapStateToProps(state) {
    return {
        config: getConfig(state),
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setProfileImageUri,
            removeProfileImage,
            updateUser,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
