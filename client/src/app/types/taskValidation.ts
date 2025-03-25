export interface ITaskFormValidation {
    title: string,
    description: string,
    status: string,
    priority: string,
    assigned_to: string
}

export interface ITaskFormErrors {
    title: string,
    description: string,
    status: string,
    priority: string,
    assigned_to: string
}