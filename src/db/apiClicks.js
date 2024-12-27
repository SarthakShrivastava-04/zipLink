import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

export async function getClicks(urlIDs) {
   const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlIDs);

   if(error){
     console.error(error.message);
     
     throw new Error ("unable to load clicks");
   } 

   return data;
}


const parser = new UAParser();
export const storeClicks = async({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    window.location.href = originalUrl;

  } catch (error) {
     console.error("recording an error:", error)
  }
}


export async function getClicksStats(url_id){
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

    if(error){
      console.error(error.message);
      throw new Error("Unable to load stats");
    }

    return data;
  }

