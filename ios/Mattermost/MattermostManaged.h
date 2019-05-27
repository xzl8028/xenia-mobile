//
//  XeniaManaged.h
//  Xenia
//
// Copyright (c) 2016-present Xenia, Inc. All Rights Reserved.
// See License.txt for license information.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTUtils.h>

@interface XeniaManaged : RCTEventEmitter <RCTBridgeModule>
- (NSUserDefaults *)bucketByName:(NSString*)name;
+ (void)sendConfigChangedEvent;

@end
