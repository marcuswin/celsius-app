export default {
  description: 'P2P Decentralized Lending & Borrowing for Cryptocurrency',
  slug: 'celsius',
  scheme: 'cel',
  privacy: 'public',
  sdkVersion: '33.0.0',
  platforms: ['ios', 'android'],
  version: '3.0.0',
  orientation: 'portrait',
  icon: './assets/images/icons/iconV3-foreground.png',
  splash: {
    image: './assets/images/loading.png',
    backgroundColor: '#BBBFC2',
    resizeMode: 'cover'
  },
  notification: {
    icon: './assets/images/icons/icon-notification.png'
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'network.celsius.wallet',
    buildNumber: '38',
    icon: './assets/images/icons/iconV3-foreground.png',
    infoPlist: {
      NSLocationAlwaysUsageDescription:
        "We'd like to use your location data in order to determine what country you're from - is that ok?",
      NSCameraUsageDescription:
        "We'd like to use your camera in order to proceed with taking a picture - is that ok?",
      NSLocationWhenInUseUsageDescription:
        "We'd like to use your location data in order to determine what country you're from - is that ok?",
      LSApplicationQueriesSchemes: [
        'fbapi',
        'fb-messenger-share-api',
        'fbauth2',
        'fbshareextension'
      ]
    },
    config: {
      googleSignIn: {
        reservedClientId:
          'com.googleusercontent.apps.765558032297-9inbsjp32b7hforr99dnmf1uv5gf3j2v'
      },
      branch: {
        apiKey: 'key_test_aes8Fgj3UgmHVgoqX8bhXlmpFznNawe2'
      }
    }
  },
  android: {
    package: 'network.celsius.wallet',
    versionCode: 38,
    googleServicesFile: './google-services.json',
    config: {
      branch: {
        apiKey: 'key_test_aes8Fgj3UgmHVgoqX8bhXlmpFznNawe2'
      }
    },
    icon: './assets/images/icons/iconV3-foreground.png',
    adaptiveIcon: {
      foregroundImage: './assets/images/icons/iconV3-front-layer3x.png',
      backgroundColor: '#BBBFC2',
      backgroundImage: './assets/images/icons/iconV3-background.png'
    },
    permissions: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'READ_CONTACTS'
    ],
    publishBundlePath: 'android\\app\\src\\main\\assets\\shell-app.bundle',
    publishManifestPath:
      'android\\app\\src\\main\\assets\\shell-app-manifest.json'
  },
  facebookScheme: 'fb193373551389215',
  facebookAppId: '193373551389215',
  facebookDisplayName: "Celsius's Staging app",
  hooks: {},
  extra: {
    ENV: 'STAGING',
    CLIENT_VERSION: 'STAGING',
    SECURITY_STORAGE_AUTH_KEY: 'id_token',
    API_URL: 'https://api.staging.celsius.network/api/v3',
    PUBLIC_KEY:
      'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4K0VBRkUvQVlUNnQ2UVBERWl0WApDc0FWenZSdFhQUzVaMS85c0JyUEpVSWF5UDZqbHZQRnFsWDFPdCtrcUZYWGtweUQ2V1Arak5nMmNiWlg3MXVDCkFKdThTMjhaTnk3U2N3ZTZiQnJkMllzdlBBM2VCWGtKU2QrTHc0MjhBZEIxQzAxYUs1R09tejJsQTZWTktHM3EKUXQyWWdmbTkwWURxcTZDV1h1ZUJWd05uUUdqQi9lMTdxOVdTTk41VG1QM0tBcWlFc0tMTHM2a1ljVHdDbjZYYwpnSWd2K3VXZUtmTnVMbDgzNUpGUUFMc2FBMm5lc0JPODRHbE45ZllxelhsWXFFMEc3bU1kUkRhZ2FSNlJQZXFPCktlQzVLbXdydUowajYvWWR5dGl2KzRqUFZCcTFIVm5kTzFvaFQ3d3cyeEVyZXpjeGdvM1JHd2dMNHJBUTRyU0MKWFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t',
    GOOGLE_WEB_CLIENT_ID:
      '349395281704-0k34ld24ad5jdnq5b18j218d6kd88rq5.apps.googleusercontent.com',
    GOOGLE_ANDROID_CLIENT_ID:
      '349395281704-g2l26t8nnqj1s8bf0o907mnjdioj9eb5.apps.googleusercontent.com',
    GOOGLE_IOS_CLIENT_ID:
      '349395281704-871nfnac0suund591jkqgllenpaof7ag.apps.googleusercontent.com',
    GOOGLE_URL: 'https://www.googleapis.com/userinfo/v2/me',
    GOOGLE_CLIENT_ID:
      '765558032297-9inbsjp32b7hforr99dnmf1uv5gf3j2v.apps.googleusercontent.com',
    FACEBOOK_APP_ID: 193373551389215,
    FACEBOOK_URL:
      'https://graph.facebook.com/me?fields=id,last_name,first_name,email&access_token=',
    TWITTER_CUSTOMER_KEY: 'lR9LHwm9jxRi2vadEDYV0meh0',
    TWITTER_SECRET_KEY: 'zGg7ORr3s3XqpHYVSBE4oxaY7XLJhI7Z0nyEKJV3Ahjpd9VRsD',
    MIXPANEL_TOKEN: '49b5bb9a66f9745b6dad55b85fa3595b',
    BRANCH_KEY: 'key_test_aes8Fgj3UgmHVgoqX8bhXlmpFznNawe2',
    SEGMENT_ANDROID_KEY: 'sXCph6341oOb4K0yiKZKvreHnQz95KRW',
    SEGMENT_IOS_KEY: '7nHI5qLTSdjcT7lALtoVGQ9ZTLpqbU5V'
  },
  isDetached: true,
  detach: {
    androidExpoViewUrl:
      'https://s3.amazonaws.com/exp-exponent-view-code/android-v2.11.2-sdk33.0.0-2aab95f5-0c82-4f4b-a3a0-828a07eb906f.tar.gz'
  }
}
