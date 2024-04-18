enum PhoneCallState {
  /**
   * The state of a Call when actively supporting conversation.
   */
  ACTIVE = "ACTIVE",
  /**
   * The initial state of an outgoing Call.
   * Common transitions are to {@link PhoneCallState.DIALING} state for a successful call or
   * {@link PhoneCallState.DISCONNECTED} if it failed.
   */
  CONNECTING = "CONNECTING",
  /**
   * The state of an outgoing Call when dialing the remote number, but not yet connected.
   */
  DIALING = "DIALING",
  /**
   * The state of a Call when no further voice or other communication is being
   * transmitted, the remote side has been or will inevitably be informed that the Call
   * is no longer active, and the local data transport has or inevitably will release resources
   * associated with this Call.
   */
  DISCONNECTED = "DISCONNECTED",
  /**
   * The state of a Call when the user has initiated a disconnection of the call, but the
   * call has not yet been disconnected.  The next
   * state of the call is (potentially) {@link PhoneCallState.DISCONNECTED}.
   */
  DISCONNECTING = "DISCONNECTING",
  /**
   * The state of a Call when in a holding state.
   */
  HOLDING = "HOLDING",
  /**
   * The state of a Call when newly created.
   */
  NEW = "NEW",
  /**
   * The state of a call that is active with the network, but the audio from the call is
   * being intercepted by an app on the local device. Telecom does not hold audio focus in this
   * state, and the call will be invisible to the user except for a persistent notification.
   */
  STATE_AUDIO_PROCESSING = "STATE_AUDIO_PROCESSING",
  /**
   * The state of a call that is being presented to the user after being in
   * {@link PhoneCallState.STATE_AUDIO_PROCESSING}. The call is still active with the network in this case, and
   * Telecom will hold audio focus and play a ringtone if appropriate.
   */
  STATE_SIMULATED_RINGING = "STATE_SIMULATED_RINGING",
  /**
   * The state of an incoming Call when ringing locally, but not yet connected.
   */
  RINGING = "RINGING",
  /**
   * The state of an external call which is in the process of being pulled from a remote device to
   * the local device.
   */
  PULLING_CALL = "PULLING_CALL",
  /**
   * The state of an outgoing Call when waiting on user to select a
   * PhoneAccount through which to place the call.
   */
  SELECT_PHONE_ACCOUNT = "SELECT_PHONE_ACCOUNT",
  /**
   * If the state does not correspond to any of the other states.
   */
  UNKNOWN = "UNKNOWN",
}

export { PhoneCallState };
