#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "XeniaBucket.h"

@interface XeniaBucketModule : NSObject<RCTBridgeModule>
@property XeniaBucket *bucket;
@end
