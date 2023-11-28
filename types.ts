export enum EEvents {
  LIBRARY_PUBLISH = 'LIBRARY_PUBLISH',
  FILE_DELETE = 'FILE_DELETE',
}

export interface IFileDete {
  event_type: EEvents,
  file_key: string,
  file_name: string,
  passcode: string,
  timestamp: string,
  triggered_by: {
    id: string;
    handle: string;
  };
  webhook_id: number
}

export interface ILibraryPublish {
  event_type: EEvents,
  retries: number;
  file_key: string;
  passcode: string;
  file_name: string;
  timestamp: string;
  webhook_id: string;
  description: string;
  triggered_by: {
    id: string;
    handle: string;
  };
  created_styles: { key: string; name: string }[];
  deleted_styles: { key: string; name: string }[];
  modified_styles: { key: string; name: string }[];
  created_variables: { key: string; name: string }[];
  deleted_variables: { key: string; name: string }[];
  modified_variables: { key: string; name: string }[];
  created_components: { key: string; name: string }[];
  deleted_components: { key: string; name: string }[];
  modifed_components: { key: string; name: string }[];
  sent_at: string;
  endpoint: string;
}

export type TEvent = ILibraryPublish | IFileDete;
