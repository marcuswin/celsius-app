/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
//#import <AppCenterReactNativeCrashes.h>
//#import <AppCenterReactNativeAnalytics.h>
//#import <AppCenterReactNative.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
// #import "RNSplashScreen.h"

#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

#import <react-native-branch/RNBranch/RNBranch.h>


@import AppsFlyerLib;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
//  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];  // Initialize AppCenter crashes
//  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];  // Initialize AppCenter analytics
//  [AppCenterReactNative register];  // Initialize AppCenter
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"celsius"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // [RNSplashScreen show];
  return YES;
}

// // AppsFlyer deeplinking
// - (BOOL) application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *_Nullable))restorationHandler
// {
//   [[AppsFlyerTracker sharedTracker] continueUserActivity:userActivity restorationHandler:restorationHandler];
//   return YES;
// }
// // Reports app open from deep link from apps which do not support Universal Links (Twitter) and for iOS8 and below
// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation {
//   [[AppsFlyerTracker sharedTracker] handleOpenURL:url sourceApplication:sourceApplication withAnnotation:annotation];
//   return YES;
// }

// // Reports app open from URL Scheme deep link for iOS 10
// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//             options:(NSDictionary *) options {
//   [[AppsFlyerTracker sharedTracker] handleOpenUrl:url options:options];
//   return YES;
// }






- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    if (![RNBranch.branch application:application openURL:url sourceApplication:sourceApplication annotation:annotation]) {
        // do other deep link routing for the Facebook SDK, Pinterest SDK, etc 
        // [[AppsFlyerTracker sharedTracker] handleOpenURL:url sourceApplication:sourceApplication withAnnotation:annotation];
    }
    return YES;
}



// Add the openURL and continueUserActivity functions 
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    if (![RNBranch.branch application:app openURL:url options:options]) {
        // do other deep link routing for the Facebook SDK, Pinterest SDK, etc 
        // [[AppsFlyerTracker sharedTracker] handleOpenUrl:url options:options];
    }
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    [RNBranch continueUserActivity:userActivity];
    // [[AppsFlyerTracker sharedTracker] continueUserActivity:userActivity restorationHandler:restorationHandler];
    return YES;
}


//-------
- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
  // You can inject any extra modules that you would like here, more information at:
  // https://facebook.github.io/react-native/docs/native-modules-ios.html#dependency-injection
  return extraModules;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

@end
