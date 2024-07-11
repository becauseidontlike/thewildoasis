import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}storage/v1/object/public/cabin-images/${imageName}`;
  //https://gfuhuhbfiixwwxrmofdz.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg

  //create cabin
  let query = supabase.from("cabins");

  if (!id) query.insert([{ ...newCabin, image: imagePath }]);
  if (id)
    query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await supabase.from("cabins").select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be added.");
  }

  //upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //delete cabin if there was error during image upload
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin picture could not be added and cabin was not created."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted.");
  }
}
