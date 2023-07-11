"use client";
import uniqid from "uniqid";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      image: null,
      song: null
    }
  });

  const handleChange = (open: boolean) => {
    if (open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log(values);
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Smth wrong");
        return;
      }
      const uniqueId = uniqid();
      
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false
          });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);

      toast.success("Song is added!");
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload"
      description="Upload your favorite songs"
      onChange={handleChange}
      isOpen={uploadModal.isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id={"title"}
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id={"author"}
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div classname="pb-10">Select song</div>
          <Input
            id={"song"}
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
            placeholder="Song"
          />{" "}
          Select image
          <Input
            id={"image"}
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
            placeholder="Image"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
