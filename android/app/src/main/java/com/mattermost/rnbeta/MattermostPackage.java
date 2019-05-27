package com.xenia.rnbeta;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class XeniaPackage implements ReactPackage {
    private final MainApplication mApplication;

    public XeniaPackage(MainApplication application) {
        mApplication = application;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                XeniaManagedModule.getInstance(reactContext),
                NotificationPreferencesModule.getInstance(mApplication, reactContext),
                new RNTextInputResetModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList();
    }
}
