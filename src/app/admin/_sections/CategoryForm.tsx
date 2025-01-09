import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Custom component defined below
import { CSS } from "@dnd-kit/utilities";

type Category = {
  id: string;
  name: string;
  icon: File | null;
  priority: number;
};

type FormInputs = {
  name: string;
  icon: FileList;
};

const CategoryForm = () => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const [categories, setCategories] = useState<Category[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newCategory: Category = {
      id: Date.now().toString(), // Unique ID
      name: data.name,
      icon: data.icon[0] || null,
      priority: categories.length + 1,
    };
    setCategories((prev) => [...prev, newCategory]);
    reset();
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCategories((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex).map((item, index) => ({
          ...item,
          priority: index + 1,
        }));
      });
    }
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded bg-white p-4 shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Icon</label>
          <input
            type="file"
            {...register("icon")}
            className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Add Category
        </button>
      </form>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={categories.map((category) => category.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-6 space-y-2">
            {categories.map((category) => (
              <SortableItem key={category.id} id={category.id}>
                <div className="flex items-center justify-between rounded bg-gray-100 p-2 shadow">
                  <span>
                    {category.name} (Priority: {category.priority})
                  </span>
                  {category.icon && (
                    <Image
                      src={URL.createObjectURL(category.icon)}
                      alt={category.name}
                      className="h-8 w-8 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  )}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

// SortableItem Component
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export const SortableItem: React.FC<{ id: string }> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default CategoryForm;
