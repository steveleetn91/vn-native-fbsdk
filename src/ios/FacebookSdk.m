#import "FacebookSdk.h"
#import <Cordova/CDVPlugin.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginManagerLoginResult/FBSDKLoginManagerLoginResult.h>
#import <FBSDKLoginManager/FBSDKLoginManager.h>
@implementation FacebookSdk

- (void)login:(CDVInvokedUrlCommand *)command {
    NSLog(@"Starting login");
    CDVPluginResult *pluginResult;
    NSArray *permissions = nil;

    if ([command.arguments count] > 0) {
        permissions = command.arguments;
    }

    // this will prevent from being unable to login after updating plugin or changing permissions
    // without refreshing there will be a cache problem. This simple call should fix the problems
    [FBSDKAccessToken refreshCurrentAccessToken:nil];

    FBSDKLoginManagerLoginResultBlock loginHandler = ^void(FBSDKLoginManagerLoginResult *result, NSError *error) {
        if (error) {
            // If the SDK has a message for the user, surface it.
            NSString *errorMessage = error.userInfo[FBSDKErrorLocalizedDescriptionKey] ?: @"There was a problem logging you in.";
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                              messageAsString:errorMessage];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            return;
        } else if (result.isCancelled) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                              messageAsString:@"User cancelled."];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } else {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                          messageAsDictionary:[self responseObject]];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    };

    // Check if the session is open or not
    if ([FBSDKAccessToken currentAccessToken] == nil) {
        // Initial log in, can only ask to read
        // type permissions
        if (permissions == nil) {
            permissions = @[];
        }
        if (! [self areAllPermissionsReadPermissions:permissions]) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:@"You can only ask for read permissions initially"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            return;
        }

        if (self.loginManager == nil) {
            self.loginManager = [[FBSDKLoginManager alloc] init];
        }
        [self.loginManager logInWithPermissions:permissions fromViewController:[self topMostController] handler:loginHandler];
        return;
    }


    if (permissions == nil) {
        // We need permissions
        NSString *permissionsErrorMessage = @"No permissions specified at login";
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsString:permissionsErrorMessage];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    [self loginWithPermissions:permissions withHandler:loginHandler];

}

@end    
    
    