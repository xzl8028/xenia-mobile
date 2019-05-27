// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getDimensions} from 'app/selectors/device';

import OptionsModal from './options_modal';

function mapStateToProps(state) {
    return {
        ...getDimensions(state),
    };
}

export default connect(mapStateToProps)(OptionsModal);
