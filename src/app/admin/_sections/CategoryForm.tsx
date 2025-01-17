"use client";
import React, { useEffect, useState } from "react";
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

import Button from "@/components/elements/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDragIndicator } from "react-icons/md";
import { HiPencilSquare } from "react-icons/hi2";
import { useAdminManageCategories } from "@/app/_queryCall/adminAuth/csr";
import Modal from "@/components/elements/Modal";

type Category = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: File | string | null;
  priority: number;
  groupName: string;
};

type FormInputs = {
  name: string;
  shortDescription: string;
  slug: string;
  icon: FileList;
  groupName: string;
};

interface CategoryFormProps {
  data: Category[];
  refetchData: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ data, refetchData }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormInputs>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [itemIdToBeUpdate, setItemIdToBeUpdate] = useState<string | undefined>(undefined);

  const watchIcon = watch("icon");

  const handleRemoveImage = () => {
    setValue("icon", undefined as unknown as FileList);
    setPreviewUrl(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const {
    adminManageCategories,
    data: mutationCategoriesResult,
    loading,
    error,
  } = useAdminManageCategories();

  useEffect(() => {
    setCategories(data || []);
    // console.log("data", data);
  }, [data]);

  useEffect(() => {
    if (watchIcon?.[0]) {
      const url = URL.createObjectURL(watchIcon[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchIcon]);

  const onSubmit = async (formData: FormInputs) => {
    const newData = {
      id: itemIdToBeUpdate || undefined,
      name: formData.name,
      groupName: formData.groupName,
      slug: formData.slug,
      description: formData.shortDescription,
      categoryImage: !itemIdToBeUpdate || formData.icon[0] ? formData.icon[0] : undefined,
      order: !itemIdToBeUpdate ? categories.length + 1 : undefined,
      toDelete: false,
    };
    console.log("formData", newData);
    try {
      await adminManageCategories([newData]);
      handleClear();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      return;
    }

    setCategories((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return prev;
      }

      // Create a new array with updated priorities
      const reorderedCategories = arrayMove(prev, oldIndex, newIndex);
      const updatedCategories = reorderedCategories.map((item, index) => ({
        ...item,
        priority: index + 1,
      }));

      // Prepare the priority updates for the affected items
      const updates = reorderedCategories
        .map((item, index) => ({
          id: item.id,
          order: index + 1, // New priority
        }))
        .filter(
          (updated) => updated.order !== prev.find((item) => item.id === updated.id)?.priority,
        );
      console.log("updates", updates);

      // Only make the API call if there are actual changes
      if (updates.length > 0) {
        adminManageCategories(updates)
          .then(() => {
            refetchData();
          })
          .catch((error) => {
            console.error("Failed to update priorities:", error);
            // Optionally revert the state on error
            setCategories(prev);
          });
      }

      return updatedCategories;
    });
  };

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; categoryId: string | null }>({
    isOpen: false,
    categoryId: null,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  function handleDelete(id: string) {
    setDeleteModal({ isOpen: true, categoryId: id });
  }

  const confirmDelete = async () => {
    if (deleteModal.categoryId && deleteConfirmation === "DELETE CATEGORY") {
      await adminManageCategories([{ id: deleteModal.categoryId, toDelete: true }]);
      setCategories((prev) => prev.filter((category) => category.id !== deleteModal.categoryId));
      handleClear();
    }
  };

  const handleClear = () => {
    setValue("icon", undefined as unknown as FileList);
    reset({
      name: "",
      slug: "",
      shortDescription: "",
    });
    setPreviewUrl(null);
    setItemIdToBeUpdate(undefined);
    setDeleteModal({ isOpen: false, categoryId: null });
    setDeleteConfirmation("");
    refetchData();
  };

  async function handleUpdate(id: string) {
    const category = categories.find((item) => item?.id === id);
    if (category) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setItemIdToBeUpdate(id);
      setPreviewUrl(category.icon as string);
      reset({
        name: category.name,
        slug: category.slug,
        shortDescription: category.shortDescription,
        icon: undefined,
      });
    }
  }
  return (
    <>
      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Input
            label="Category Name"
            placeholder=" "
            type="text"
            {...register("name", { required: true })}
          />
          <Input
            label="Category Group Name"
            placeholder=" "
            type="text"
            {...register("groupName", { required: true })}
          />
          <Input
            label="Slug"
            type="text"
            placeholder=" "
            {...register("slug", { required: true })}
          />
          <TextareaAutoGrowing
            label="Short Description"
            placeholder=" "
            {...register("shortDescription", { required: true })}
          />

          <label
            htmlFor="uploadFile1"
            className="relative mx-auto flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-bg1 bg-bg1 bg-opacity-5 font-semibold text-bg1"
          >
            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="h-32 w-full object-contain"
                />
                <IoMdCloseCircleOutline
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveImage();
                  }}
                  className="absolute right-2 top-2"
                />
              </>
            ) : (
              <>
                <IoCloudUploadOutline className="text-5xl" />
                Upload file
                <p className="mt-2 text-xs font-medium text-gray-400">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </>
            )}
            <input
              type="file"
              id="uploadFile1"
              {...register("icon")}
              className="hidden"
              accept="image/*"
            />
          </label>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="w-full">
              {itemIdToBeUpdate ? "Update" : "Add"} Category
            </Button>
            <Button type="button" onClick={handleClear} className="w-full">
              Clear
            </Button>
          </div>
          {error && <p className="text-center text-red-500">{error?.message}</p>}
          {mutationCategoriesResult && (
            <p className="text-center text-green-500">
              {mutationCategoriesResult?.message || "Updated Successfully"}
            </p>
          )}
        </form>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={categories && categories?.map((category) => category?.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-6 space-y-2">
              {categories &&
                categories?.map((category) => (
                  <SortableItem
                    handleUpdate={() => handleUpdate(category?.id)}
                    handleDelete={() => handleDelete(category?.id)}
                    key={category?.id}
                    id={category.id}
                  >
                    <div className="relative grid grid-cols-5 rounded bg-gray-100 p-2 shadow">
                      <div className="col-span-4 grid grid-cols-12 items-center gap-5">
                        <MdOutlineDragIndicator className="col-span-1 text-2xl" />

                        <span className="borderedText absolute left-2 top-0 select-none text-4xl font-bold">
                          {category?.priority}
                        </span>
                        <div className="col-span-11 text-wrap">
                          <h6 className="font-semibold">{category?.name}</h6>
                          <h6 className="text-sm">
                            <strong>Slug: </strong>
                            {category?.slug}
                          </h6>
                          <h6 className="text-sm">
                            <strong>Group: </strong>
                            {category?.groupName}
                          </h6>
                          <p className="text-sm">{category?.shortDescription}</p>
                        </div>
                      </div>
                      {category.icon && (
                        <Image
                          src={
                            typeof category.icon === "string"
                              ? category.icon
                              : URL.createObjectURL(category.icon)
                          }
                          alt={category.name}
                          className="col-span-1 w-full object-contain"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  </SortableItem>
                ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <Modal onClose={() => setDeleteModal({ isOpen: false, categoryId: null })}>
          <div className="rounded-lg border border-bg1 bg-white p-4">
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p className="text-sm text-gray-600">
              Type <strong>DELETE CATEGORY</strong> to confirm deletion.
            </p>
            <Input
              type="text"
              label="Type Your Response"
              value={deleteConfirmation}
              onChange={(e: any) => setDeleteConfirmation(e.target.value)}
              placeholder=" "
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={() => setDeleteModal({ isOpen: false, categoryId: null })}
                className="bg-gray-500"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleteConfirmation !== "DELETE"}
                className="bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
            <p className="text-xs text-red-500">
              <strong>Note: </strong>You have to connect to Developer Team to recover it after
              delete.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

const SortableItem: React.FC<{
  id: string;
  handleDelete: any;
  handleUpdate: any;
  children: React.ReactNode;
}> = ({ id, handleDelete, handleUpdate, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative">
      <HiPencilSquare
        className="absolute left-full top-5 z-10 -translate-x-1/2 translate-y-1/2 text-3xl text-gray-600 hover:scale-110"
        onClick={() => handleUpdate()}
      />
      <IoMdCloseCircleOutline
        onClick={() => {
          handleDelete();
        }}
        className="absolute bottom-full left-full z-10 -translate-x-1/2 translate-y-1/2 text-3xl text-red-600 hover:scale-110"
      />
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    </div>
  );
};

export default CategoryForm;
