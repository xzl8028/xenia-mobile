// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {NativeModules, Platform} from 'react-native';

// TODO: Remove platform specific once android is implemented
const XeniaBucket = Platform.OS === 'ios' ? NativeModules.XeniaBucketModule : null;

export default {
    setPreference: (key, value) => {
        if (XeniaBucket) {
            XeniaBucket.setPreference(key, value);
        }
    },
    getPreference: async (key) => {
        if (XeniaBucket) {
            const value = await XeniaBucket.getPreference(key);
            if (value) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
        }

        return null;
    },
    removePreference: (key) => {
        if (XeniaBucket) {
            XeniaBucket.removePreference(key);
        }
    },
    writeToFile: (fileName, content) => {
        if (XeniaBucket) {
            XeniaBucket.writeToFile(fileName, content);
        }
    },
    readFromFile: async (fileName) => {
        if (XeniaBucket) {
            const value = await XeniaBucket.readFromFile(fileName);
            if (value) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
        }

        return null;
    },
    removeFile: (fileName) => {
        if (XeniaBucket) {
            XeniaBucket.removeFile(fileName);
        }
    },
};
