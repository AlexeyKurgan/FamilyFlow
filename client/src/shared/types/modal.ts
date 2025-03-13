interface IModal {
    show: boolean,
    title?: string,
    type: 'add' | 'edit' | 'delete' | "base" | null,
    taskId?: string,
    content?: string,
    className?: string,
}

export default IModal;