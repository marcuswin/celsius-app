package com.celsius;

import android.app.Application;

import io.branch.rnbranch.RNBranchModule;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import info.applike.advertisingid.RNAdvertisingIdPackage;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.microsoft.codepush.react.CodePush;
import com.appsflyer.reactnative.RNAppsFlyerPackage;
import com.microsoft.codepush.react.CodePush;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.celsius.generated.BasePackageList;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), Arrays.<SingletonModule>asList());

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage(),
            new NetInfoPackage(),
            new GeolocationPackage(),
            new AppCenterReactNativeCrashesPackage(getApplication(), getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(getApplication(), getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(getApplication()),
            new RNMixpanel(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new RNAppsFlyerPackage(),
            new RNAdvertisingIdPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
            new RNDeviceInfo(),
            new SplashScreenReactPackage(),
            new SvgPackage(),
            new RNGestureHandlerPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    RNBranchModule.getAutoInstance(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
