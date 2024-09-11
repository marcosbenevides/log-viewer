export enum EventParamKeyType {
  ENGAGEMENT_TIME_MSEC = 'engagement_time_msec',
  SYSTEM_APP_UPDATE = 'system_app_update',
  PREVIOUS_FIRST_OPEN_COUNT = 'previous_first_open_count',
  ENGAGED_SESSION_EVENT = 'engaged_session_event',
  SYSTEM_APP = 'system_app',
  UPDATE_WITH_ANALYTICS = 'update_with_analytics',
  FIREBASE_EVENT_ORIGIN = 'firebase_event_origin',
  FIREBASE_CONVERSION = 'firebase_conversion',
  GA_SESSION_ID = 'ga_session_id',
  GA_SESSION_NUMBER = 'ga_session_number',
  FIREBASE_SCREEN_ID = 'firebase_screen_id',
  FIREBASE_SCREEN_CLASS = 'firebase_screen_class',
}

export enum DefaultEventParamKeyType {
  DEVICEID = 'deviceId',
  METHODNAME = 'methodName',
  COUNTORDERS = 'countOrders',
  LOCALID = 'localId',
  SPACEREMAINING = 'spaceRemaining',
  DEVICENAME = 'deviceName',
}

export type ParamKeyType = string;

export interface IEventParam {
  key: ParamKeyType;
  value: {
    string_value: string | null | undefined;
    int_value: number | null | undefined;
    float_value: number | null | undefined;
    double_value: number | null | undefined;
  };
}

export interface IUserProperty {
  key: ParamKeyType;
  value: {
    string_value: string | null | undefined;
    int_value: number | null | undefined;
    float_value: number | null | undefined;
    double_value: number | null | undefined;
    set_timestamp_micros: string | null | undefined;
  };
}

export interface IFirebaseLog {
  event_date: string;
  event_timestamp: string;
  event_name: string;
  event_params: IEventParam[];
  event_previous_timestamp: string | null | undefined;
  event_value_in_usd: string | null | undefined;
  event_bundle_sequence_id: string | null | undefined;
  event_server_timestamp_offset: string | null | undefined;
  user_id: string | null | undefined;
  user_pseudo_id: string | null | undefined;
  privacy_info: {
    analytics_storage: 'Yes' | 'No';
    ads_storage: 'Yes' | 'No';
    uses_transient_token: 'Yes' | 'No';
  };
  user_properties: IUserProperty[];
  user_first_touch_timestamp: string | null | undefined;
  device: {
    category: string | null | undefined;
    mobile_brand_name: string | null | undefined;
    mobile_model_name: string | null | undefined;
    mobile_marketing_name: string | null | undefined;
    mobile_os_hardware_model: string | null | undefined;
    operating_system: string | null | undefined;
    operating_system_version: string | null | undefined;
    vendor_id: string | null | undefined;
    advertising_id: string | null | undefined;
    language: string | null | undefined;
    is_limited_ad_tracking: 'Yes' | 'No';
    time_zone_offset_seconds: string | null | undefined;
    browser: string | null | undefined;
    browser_version: string | null | undefined;
    web_info: string | null | undefined;
  };
  geo: {
    city: string | null | undefined;
    country: string | null | undefined;
    continent: string | null | undefined;
    region: string | null | undefined;
    sub_continent: string | null | undefined;
    metro: string | null | undefined;
  };
  app_info: {
    id: string | null | undefined;
    version: string | null | undefined;
    install_store: string | null | undefined;
    firebase_app_id: string;
    install_source: string | null | undefined;
  };
  stream_id: string;
  platform: string;
  is_active_user: 'true' | 'false';
}
