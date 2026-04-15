import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/cors";
import { z } from "https://esm.sh/zod@3.23.8";

const BodySchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email().max(255),
  contact_type: z.enum(["story", "anonymous", "expert", "collaboration", "sponsorship", "general"]),
  message: z.string().min(1).max(5000),
  website: z.string().max(500).optional(),
  company_name: z.string().max(200).optional(),
  project_idea: z.string().max(2000).optional(),
  consent: z.boolean(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name || null,
      email: parsed.data.email,
      contact_type: parsed.data.contact_type,
      message: parsed.data.message,
      website: parsed.data.website || null,
      company_name: parsed.data.company_name || null,
      project_idea: parsed.data.project_idea || null,
      consent: parsed.data.consent,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
