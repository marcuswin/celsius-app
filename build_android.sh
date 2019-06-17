#!/bin/bash

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home
export EXPO_USERNAME=celsiustech
export EXPO_PASSWORD=!?Cel51u5
export EXPO_ANDROID_KEYSTORE_PASSWORD=be4f0b6d-19a6-43b2-90ec-be4533a672f6
export EXPO_ANDROID_KEY_PASSWORD=fcc09f2e-5fba-4945-b57e-d5791b36a513

turtle build:android \
    --release-channel staging \
    --keystore-path celsius.jks \
    --keystore-alias QGNlbHNpdXN0ZWNoL2NlbHNpdXM=
