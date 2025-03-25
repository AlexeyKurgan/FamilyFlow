import { ITaskFormValidation, ITaskFormErrors } from "../../app/types/taskValidation";

export const taskFormValidation = (values: ITaskFormValidation, t: (key: string) => string): ITaskFormErrors => {
    const errors = {} as ITaskFormErrors;

    if (!values.title) {
        errors.title = t('Required')
    } else if (values.title.length < 3) {
        errors.title = t("MinLength3");
    }
    if (!values.description) {
        errors.description = t('Required')
    } else if (values.description.length < 3) {
        errors.description = t("MinLength3");
    }
    if (!values.status) {
        errors.status = t('StatusNotEmpty')
    }
    if (!values.priority) {
        errors.priority = t('priorityNotEmpty')
    }
    if (!values.assigned_to) {
        errors.assigned_to = t('assignedUserEmpty')
    }

    return errors
}