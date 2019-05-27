package com.xenia.rnbeta;

import android.app.Application;
import android.content.Context;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class XeniaManagedModule extends ReactContextBaseJavaModule {
    private static XeniaManagedModule instance;

    private boolean shouldBlurAppScreen = false;

    private XeniaManagedModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public static XeniaManagedModule getInstance(ReactApplicationContext reactContext) {
        if (instance == null) {
            instance = new XeniaManagedModule(reactContext);
        }

        return instance;
    }

    public static XeniaManagedModule getInstance() {
        return instance;
    }

    @Override
    public String getName() {
        return "XeniaManaged";
    }

    @ReactMethod
    public void blurAppScreen(boolean enabled) {
        shouldBlurAppScreen = enabled;
    }

    public boolean isBlurAppScreenEnabled() {
        return shouldBlurAppScreen;
    }

    @ReactMethod
    public void getConfig(final Promise promise) {
        try {
            Bundle config = NotificationsLifecycleFacade.getInstance().getManagedConfig();

            if (config != null) {
                Object result = Arguments.fromBundle(config);
                promise.resolve(result);
            } else {
                promise.resolve(Arguments.createMap());
            }
        } catch (Exception e) {
            promise.resolve(Arguments.createMap());
        }
    }
}
