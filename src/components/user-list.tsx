import { useState } from "react";
import { UserItem } from "./user-item";
import { User } from "../types/user";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const dummyData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Mary smith",
    email: "mary@example.com",
  },
  {
    id: 3,
    name: "Lewis Platt",
    email: "lewis@example.com",
  },
];

export function UserList() {
  const [userData, setUserData] = useState<User[]>(dummyData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setUserData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // console.log({ userData });

  return (
    <div className="max-w-2xl mx-auto grid gap-2 my-10 w-full">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={userData}>
          {userData.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
