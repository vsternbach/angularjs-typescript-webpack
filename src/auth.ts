import { EventEmitter } from 'eventemitter3';
import { singleton } from './decorators';

export interface IGapiOAuthInitArgs {
  /**
   * The API Key to use.
   */
  apiKey?: string;
  /**
   * An array of discovery doc URLs or discovery doc JSON objects.
   */
  discoveryDocs?: string[];
  /**
   * The app's client ID, found and created in the Google Developers Console.
   */
  clientId?: string;
  /**
   * The scopes to request, as a space-delimited string.
   */
  scope?: string;
}

@singleton
export class OAuth extends EventEmitter {

  constructor(private args: IGapiOAuthInitArgs = {}) {
    super();
    console.log('OAuth instantiated');
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    gapi.load('client:auth2', () => this.initClient());
  }

  isSignedIn(): boolean {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  private async initClient() {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    try {
      await gapi.client.init(this.args);
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen((val) => {
        this.updateSigninStatus(val);
      });
      // Handle the initial sign-in state.
      this.updateSigninStatus(this.isSignedIn());
    } catch (e) {
      console.error(e);
    }
  }

  private updateSigninStatus(isSignedIn) {
    this.emit('gapi.auth2.isSignedIn', isSignedIn);
    if (!isSignedIn) {
      this.signIn();
    }
  }
}
