import { useSelector, useDispatch } from "react-redux";
import {
  IAddTaskModalProps,
  IDeleteTaskModalProps,
  IEditTaskModalProps,
  IModal,
  IModalComponentProps,
} from "../../types/modal";
import CustomModal from "./Modal";
import AddTaskModal, { IFormikValues } from "./addTaskModal/AddTaskModal";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";
import BaseModal from "./baseModal/BaseModal";
import {
  addTask,
  updateTask,
  deleteTask,
  Task,
} from "../../../app/api/tasks/tasksRequest";
import { hideModal } from "../../../store/slices/modalSlice";
import { showAlert } from "../../../store/slices/alertSlice";
import {
  addTask as addTaskAction,
  updateTask as updateTaskAction,
  removeTask,
} from "../../../store/slices/tasksSlice";
import { ComponentType } from "react";
import { IAuthState } from "../../../auth/types/authUser";

type ModalPropsUnion =
  | IAddTaskModalProps
  | IEditTaskModalProps
  | IDeleteTaskModalProps
  | undefined;

const LayoutModal = () => {
  const dispatch = useDispatch();
  const { show, title, type, taskId } = useSelector(
    (state: { modal: IModal }) => state.modal
  );
  const { session } = useSelector((state: { auth: IAuthState }) => state.auth);

  let formSubmitHandler: (() => void) | undefined;

  const handleSubmit = async (
    values?: IFormikValues & { creator_id?: string; id?: number }
  ) => {
    if (type === "add" && values && !values.id && values.creator_id) {
      try {
        const { data: newTask } = await addTask({
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          assigned_to: values.assigned_to,
          creator_id: values.creator_id,
        });

        if (
          newTask &&
          (newTask.creator_id === session?.user.id ||
            newTask.assigned_to === session?.user.id)
        ) {
          dispatch(addTaskAction(newTask as Task));
        }
        dispatch(
          showAlert({
            message: "Task added successfully",
            severity: "success",
          })
        );
        dispatch(hideModal());
      } catch (error) {
        dispatch(
          showAlert({
            message:
              error instanceof Error ? error.message : "Failed to add task",
            severity: "error",
          })
        );
      }
    } else if (type === "edit" && values && values.id) {
      try {
        const { data: updatedTask } = await updateTask({
          id: values.id,
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          assigned_to: values.assigned_to,
        });
        if (updatedTask) {
          dispatch(updateTaskAction(updatedTask as Task));
        }
        dispatch(
          showAlert({
            message: "Task updated successfully",
            severity: "success",
          })
        );
        dispatch(hideModal());
      } catch (error) {
        dispatch(
          showAlert({
            message:
              error instanceof Error ? error.message : "Failed to update task",
            severity: "error",
          })
        );
      }
    } else if (type === "delete" && taskId) {
      try {
        await deleteTask(taskId);
        dispatch(removeTask(taskId));
        dispatch(
          showAlert({
            message: "Task deleted successfully",
            severity: "success",
          })
        );
        dispatch(hideModal());
      } catch (error) {
        dispatch(
          showAlert({
            message:
              error instanceof Error ? error.message : "Failed to delete task",
            severity: "error",
          })
        );
      }
    } else {
      console.error("Invalid submit configuration:", { type, values, taskId });
    }
  };

  const getModalConfig = () => {
    switch (type) {
      case "add":
        return {
          component: AddTaskModal as ComponentType<IModalComponentProps>,
          props: {
            onSubmit: handleSubmit,
            onFormSubmit: (submitFn: () => void) => {
              formSubmitHandler = submitFn;
            },
          } as IAddTaskModalProps,
          submitText: "Create",
          className: "base-modal addModal",
        };
      case "edit":
        return {
          component: EditTaskModal as ComponentType<IModalComponentProps>,
          props: {
            taskId,
            onSubmit: handleSubmit,
            onFormSubmit: (submitFn: () => void) => {
              formSubmitHandler = submitFn;
            },
          } as IEditTaskModalProps,
          submitText: "Update",
          className: "base-modal editModal",
        };
      case "delete":
        return {
          component: DeleteTaskModal as ComponentType<IModalComponentProps>,
          props: { taskId } as IDeleteTaskModalProps,
          submitText: "Delete",
          className: "base-modal deleteModal",
        };
      default:
        return {
          component: BaseModal as ComponentType<IModalComponentProps>,
          props: undefined as undefined,
          submitText: "Save",
          className: "base-modal baseModal",
        };
    }
  };

  const { component, props, submitText, className } = getModalConfig();

  return (
    <CustomModal
      show={show}
      title={title}
      componentRender={component}
      componentProps={props as ModalPropsUnion}
      cancelText="Cancel"
      submitText={submitText}
      type={type}
      className={className}
      onSubmit={() => {
        if ((type === "add" || type === "edit") && formSubmitHandler) {
          formSubmitHandler();
        } else {
          handleSubmit();
        }
      }}
    />
  );
};

export default LayoutModal;
