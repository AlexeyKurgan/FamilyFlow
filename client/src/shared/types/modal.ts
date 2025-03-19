import { IFormikValues } from "../components/modal/addTaskModal/AddTaskModal";

export interface IModal {
    show: boolean;
    title?: string;
    type: "add" | "edit" | "delete" | "base" | null;
    taskId?: number;
    content?: string;
    className?: string;
}

export interface IModalComponentProps {
    taskId?: number;
    onSubmit?: (
        values?: IFormikValues & { creator_id?: string; id?: number }
    ) => Promise<void>;
    onFormSubmit?: (submitFn: () => void) => void;
}

export interface IAddTaskModalProps extends IModalComponentProps {
    onSubmit: (
        values?: IFormikValues & { creator_id?: string }
    ) => Promise<void>;
    onFormSubmit?: (submitFn: () => void) => void;
}

export interface IEditTaskModalProps extends IModalComponentProps {
    taskId?: number;
    onSubmit: (
        values?: IFormikValues & { creator_id?: string; id?: number }
    ) => Promise<void>;
    onFormSubmit?: (submitFn: () => void) => void;
}

export interface IDeleteTaskModalProps extends IModalComponentProps {
    taskId?: number;
}

export default IModal;