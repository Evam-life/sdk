/**
 * Represent the state of the internet connection
 */
enum InternetState {
    /** No internet connection is available at the moment **/
    NO_INTERNET= "NO_INTERNET",
    /** Internet connection is available at 2G speeds **/
    CONNECTED_2G = "CONNECTED_2G",
    /** Internet connection is available at EDGE speeds **/
    CONNECTED_EDGE = "CONNECTED_EDGE",
    /** Internet connection is available at 3G speeds **/
    CONNECTED_3G = "CONNECTED_3G",
    /** Internet connection is available at 4G speeds **/
    CONNECTED_4G = "CONNECTED_4G",
    /** Internet connection is available at 5G speeds **/
    CONNECTED_5G = "CONNECTED_5G",
    /** The device is connected through Wi-Fi **/
    CONNECTED_WIFI = "CONNECTED_WIFI"
}

export {InternetState};