export interface ILibraryPublish {
    retries: number;
    file_key: string;
    passcode: string;
    file_name: string;
    timestamp: string;
    event_type: string;
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
