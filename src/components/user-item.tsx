import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { User } from "../types/user";

interface UserItemProps {
  user: User;
}

export function UserItem({ user }: UserItemProps) {
  const { id, name, email } = user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-blue-200 p-4 rounded shadow-md flex justify-between w-auto"
    >
      <div>
        <h3 className="txt-lg font-semibold">{name}</h3>
        <p className="text-gray-600/70">{email}</p>
      </div>
      <button {...attributes} {...listeners} className="cursor-move">
        drag
      </button>
    </div>
  );
}
