package com.mycosts;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  public void onCreate() {
    super.onCreate();
    setActivityCallbacks(new ActivityCallbacks() {
      @Override
      public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

      }

      @Override
      public void onActivityStarted(Activity activity) {

      }

      @Override
      public void onActivityResumed(Activity activity) {

      }

      @Override
      public void onActivityPaused(Activity activity) {
//                activity.finish();
//                activity.recreate();

      }

      @Override
      public void onActivityStopped(Activity activity) {

      }

      @Override
      public void onActivityResult(int requestCode, int resultCode, Intent data) {

      }

      @Override
      public void onActivityDestroyed(Activity activity) {

      }
    });
  }
  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {

    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new FingerprintAuthPackage(),
            new SvgPackage()

    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
