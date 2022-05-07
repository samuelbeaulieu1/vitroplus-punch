export interface Notification {
    id?: number;
    timeout?: number;
    message: string;
    title?: string;
    type: 'error'|'success';
}