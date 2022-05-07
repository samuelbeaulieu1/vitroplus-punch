export interface Employee {
    id?: string;
    first_name: string;
    last_name: string;
    pin?: string;
    branch_id: string;
    is_constant_hours: boolean;
    constant_hours: number;
    email: string;
}