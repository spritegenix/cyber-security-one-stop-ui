"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
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
import { CSS } from "@dnd-kit/utilities";
import { Input, TextareaAutoGrowing } from "@/components/elements/Input";
import { IoCloudUploadOutline } from "react-icons/io5";
import Button from "@/components/elements/Button";

type Category = {
  id: string;
  name: string;
  icon: File | null;
  priority: number;
};

type FormInputs = {
  name: string;
  shortDescription: string;
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
    console.log(data, "category");
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
    <div className="mx-auto max-w-sm p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded bg-white p-4 shadow">
        <Input label="Category Name" type="text" {...register("name", { required: true })} />
        <TextareaAutoGrowing
          label="Short Description"
          {...register("shortDescription", { required: true })}
        />
        {/* Icon Image Upload  */}
        <label
          htmlFor="uploadFile1"
          className="mx-auto flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-bg1 bg-bg1 bg-opacity-5 font-semibold text-bg1"
        >
          <IoCloudUploadOutline className="text-5xl" />
          Upload file
          <p className="mt-2 text-xs font-medium text-gray-400">
            PNG, JPG SVG, WEBP, and GIF are Allowed.
          </p>
          <input type="file" id="uploadFile1" {...register("icon")} className="hidden" />
        </label>

        <Button type="submit" className="w-full">
          Add Category
        </Button>
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

const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
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
