import { corsHeaders } from "../utils/middleware.js";
import { listUploadMetadata } from "../utils/app-data.js";

export async function onRequestGet(context) {
  try {
    const uploads = await listUploadMetadata(context.env);
    return new Response(JSON.stringify({ success: true, uploads }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(),
      },
    });
  } catch (error) {
    console.error("Failed to list uploads", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to list uploads" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(),
      },
    });
  }
}