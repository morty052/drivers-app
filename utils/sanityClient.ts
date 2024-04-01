import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "xnrrhmkl",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token:
    "skclrbjZdaIF3eZYbS4vcA67NR1P7TaqvRzcXVNaz6VVEMi8idNIf9cSY1HdM6uBWupVxLaDdspkQKSkP1DAA9NMsNVR40Dh9VLNIinjeouAqUFqq09tqbGqQn12mRnePmuUSoinwL20hZrngoDt81bAseV5uIrcQfipGGH3kjQDQgVumHtp", // Only if you want to update content with the client
});

export async function uploadImage(image_blob: Blob) {
  try {
    const _id = (await sanityClient.assets.upload("image", image_blob))._id;
    return _id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default sanityClient;
