import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
   const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);

   if(error){
     console.error(error.message);
     
     throw new Error ("unable to load urls");
   } 

   return data;
}

export async function deleteUrl(id) {
   const {data, error} = await supabase.from("urls").delete().eq("id",id);

   if(error){
     console.error(error.message);
     throw new Error ("unable to delete url");
   } 

   return data;
}

export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
  const random6 = Math.random().toString(36).slice(2,8);
  const short_url = `https://ziplink-444.netlify.app/${random6}`;
  const fileName = `qr-${random6}`
  const custom_url = customUrl? `https://ziplink-444.netlify.app/${customUrl}` : ""; 

  const {error: storageError} = await supabase.storage.from("qrs").upload(fileName, qrcode);
  if(storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`

   const {data, error} = await supabase
   .from("urls")
   .insert([
    {
      title,
      original_url: longUrl, 
      short_url,
      custom_url: custom_url || null, 
      user_id, 
      qrs: qr
    }])
    .select();

   if(error){
     console.error(error.message);
     throw new Error ("unable to create url");
   } 

   return data;
}

export async function getLongUrl(id) {
  console.log("ndn")
  // console.log(process.env.REACT_APP_BASE_URL)
  console.log("dbb")
  const shortUrl = `ziplink-444.netlify.app/${id}`;
  console.log("check")
  console.log(shortUrl)
  let {data: matchedUrl, error} = await supabase
  .from("urls")
  .select("id, original_url")
  .or(`short_url.eq.${shortUrl},custom_url.eq.${shortUrl}`)
  .single();

  if(error){
    console.error("error fetching short url", error);
    return;
  }
  return matchedUrl;
}


export async function getUrl({id, user_id}){
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

    if(error){
      console.error(error.message);
      throw new Error("Short Url not found");
    }

    return data;
  }

