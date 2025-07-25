import {
  FaTableList,
  AiFillDelete,
  MdNoteAdd,
  FaEdit,
} from "../../../shared/react-icons/icons";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IAuthState } from "../../../auth/types/authUser";
import { fetchTasksUserById } from "../../../store/slices/tasksSlice";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import { showModal } from "../../../store/slices/modalSlice";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const itemsPerPage = 5;
  const { session } = useSelector((state: { auth: IAuthState }) => state.auth);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const statusFilter = searchParams.get("statusFilter") || "all";
  const priorityFilter = searchParams.get("priorityFilter") || "all";

  useEffect(() => {
    if (session?.user.id) {
      dispatch(fetchTasksUserById({ user_uuid: session.user.id }));
    }
  }, [dispatch, session]);

  const getNewFormateDate = (date: Date) => {
    const newDate = new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    return newDate;
  };

  const preparedTasks = useMemo(() => {
    if (!session?.user.id) return [];
    const mappedTasks = tasks
      ?.filter((task) => task.assigned_to === session.user.id)
      .map((task) => {
        const creator = Array.isArray(task.creator)
          ? task.creator
          : [task.creator];
        const assigned = Array.isArray(task.assigned)
          ? task.assigned
          : [task.assigned];
        return {
          ...task,
          creatorName:
            creator.length > 0
              ? `${creator[0].name} ${creator[0].last_name}`
              : "Unknown",
          assignedName:
            assigned.length > 0
              ? `${assigned[0].name} ${assigned[0].last_name}`
              : "Unknown",
        };
      });
    return mappedTasks?.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [tasks, session?.user.id]);

  const filteredTasks = useMemo(() => {
    return preparedTasks?.filter((task) => {
      const searchLower = searchValue.toLowerCase();
      const matchesSearch = task.title.toLowerCase().includes(searchLower);
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [preparedTasks, searchValue, statusFilter, priorityFilter]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks?.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredTasks]);

  const totalPages = Math.ceil((filteredTasks?.length || 0) / itemsPerPage);

  const onAddModal = () => {
    dispatch(
      showModal({
        title: "Add Task",
        type: "add",
      })
    );
  };

  const onEditModal = (taskId: number) => {
    dispatch(
      showModal({
        title: "Edit Task",
        type: "edit",
        taskId,
      })
    );
  };

  const onDeleteModal = (taskId: number) => {
    dispatch(
      showModal({
        title: "Delete Task",
        type: "delete",
        taskId,
      })
    );
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Header */}
      <div
        className="grid grid-cols-[13%_20%_9%_7%_12%_12%_14%_4%_4%_repeat(auto-fit,minmax(50px,1fr))]
         gap-2 bg-[#fabb18]
         text-[1.2em]
         text-black font-bold py-6 px-4"
      >
        <span className="flex items-center">Title</span>
        <span className="flex items-center">Description</span>
        <span className="flex items-center">Status</span>
        <span className="flex items-center">Priority</span>
        <span className="flex items-center">Creator Name</span>
        <span className="flex items-center">Assigned By</span>
        <span className="flex items-center">Created At</span>
        <span></span>
        <span></span>
      </div>

      <div className="max-h-[270px] overflow-auto scrollbar">
        {/* Row */}
        {loading ? (
          <div className="flex justify-center items-center p-4 w-full h-full">
            <ClipLoader color="#FABB18" size={75} />
          </div>
        ) : (
          <>
            {paginatedTasks?.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[13%_20%_9%_7%_12%_12%_14%_4%_4%_repeat(auto-fit,minmax(50px,1fr))] 
                         gap-2 border-b-4 border-amber-400 last:border-b-0 bg-gray-800 py-6 px-4"
              >
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start !relative"
                  placement="top"
                  title={task.title}
                  component={"div"}
                  disableRipple={true}
                >
                  <span className="truncate">{task.title}</span>
                </CustomTooltip>
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
                  placement="top"
                  disableRipple={true}
                  title={task.description}
                  component={"div"}
                >
                  <span className="truncate">{task.description}</span>
                </CustomTooltip>
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
                  placement="top"
                  disableRipple={true}
                  title={task.status}
                  component={"div"}
                >
                  <span className="truncate">{task.status}</span>
                </CustomTooltip>
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
                  placement="top"
                  disableRipple={true}
                  title={task.priority}
                  component={"div"}
                >
                  <span className="truncate">{task.priority}</span>
                </CustomTooltip>
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
                  placement="top"
                  disableRipple={true}
                  title={task.creatorName}
                  component={"div"}
                >
                  <span className="truncate">{task.creatorName}</span>
                </CustomTooltip>
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
                  placement="top"
                  disableRipple={true}
                  title={task.assignedName}
                  component={"div"}
                >
                  <span className="truncate">{task.assignedName}</span>
                </CustomTooltip>
                <CustomTooltip
                  className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
                  placement="top"
                  disableRipple={true}
                  title={getNewFormateDate(task.created_at)}
                  component={"div"}
                  onClick={onAddModal}
                >
                  <span className="truncate">
                    {getNewFormateDate(task.created_at)}
                  </span>
                </CustomTooltip>
                <CustomTooltip
                  className="group"
                  placement="top"
                  disableRipple={true}
                  title={"Edit task"}
                  component={"div"}
                  onClick={() => onEditModal(task.id)}
                >
                  <FaEdit
                    className="text-white group-hover:text-amber-400"
                    size={25}
                  />
                </CustomTooltip>
                <CustomTooltip
                  className="group"
                  placement="top"
                  disableRipple={true}
                  title={"Delete task"}
                  component={"div"}
                  onClick={() => onDeleteModal(task.id)}
                >
                  <AiFillDelete
                    className="text-white group-hover:text-amber-400"
                    size={25}
                  />
                </CustomTooltip>
              </div>
            ))}

            {paginatedTasks?.length === 0 && (
              <div className="p-5.5 flex justify-center items-center w-full">
                <FaTableList size={45} className="text-amber-400 mr-3.5" />
                <span className="text-[2em]">Empty tasks list</span>
              </div>
            )}
          </>
        )}
      </div>
      {/* Table Pagination */}
      <div className="flex justify-center relative gap-2 mt-4 p-2.5">
        <div className="flex absolute bottom-[20px] left-[25px]">
          <FaTableList size={25} className="text-amber-400 mr-3.5" />
          <p>
            Total Tasks:{" "}
            <span className="font-bold text-[1.2em]">
              {filteredTasks?.length}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span className="text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <div className="absolute bottom-[10px] right-[14px]">
          <div className="absolute right-[7px] flex">
            <div className="absolute top-0 left-0 size-3 max-h-[12px] inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></div>
            <div className="relative inline-flex justify-end size-3 rounded-full bg-amber-600"></div>
          </div>
          <CustomTooltip
            className="group !static ml-auto"
            placement="top"
            disableRipple={true}
            title={"Add Task"}
            component={"div"}
            onClick={onAddModal}
          >
            <MdNoteAdd
              size={35}
              className="text-white group-hover:text-amber-400"
            />
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default Table;
