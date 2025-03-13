import { useSelector } from "react-redux";
import IModal from "../../types/modal";
import CustomModal from "./Modal";
import AddTaskModal from "./addTaskModal/AddTaskModal";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";
import BaseModal from "./baseModal/BaseModal";

const LayoutModal = () => {
  const { show, title, type, taskId } = useSelector(
    (state: { modal: IModal }) => state.modal
  );

  const handleSubmit = () => {
    console.log("Submit for type:", type, "taskId:", taskId);
  };

  const getModalConfig = () => {
    switch (type) {
      case "add":
        return {
          component: AddTaskModal,
          props: { onSubmit: handleSubmit },
          submitText: "Create",
          className: "base-modal addModal",
        };
      case "edit":
        return {
          component: EditTaskModal,
          props: { taskId, onSubmit: handleSubmit },
          submitText: "Update",
          className: "base-modal editModal",
        };
      case "delete":
        return {
          component: DeleteTaskModal,
          props: { taskId, onSubmit: handleSubmit },
          submitText: "Delete",
          className: "base-modal deleteModal",
        };
      default:
        return {
          component: BaseModal,
          props: {},
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
      componentProps={props}
      cancelText="Cancel"
      submitText={submitText}
      type={type}
      className={className}
      onSubmit={handleSubmit}
    />
  );
};

export default LayoutModal;
