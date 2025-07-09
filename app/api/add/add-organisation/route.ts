import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Get the latest organisation by order_index
    const { data: lastOrg, error: lastOrgError } = await supabase
      .from("Organisation")
      .select("order_index")
      .eq("cv_id", reqBody.cv_id)
      .order("order_index", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastOrgError) throw lastOrgError;

    const newOrderIndex = (lastOrg?.order_index ?? 0) + 1;

    // 2. Insert new organisation
    const { data: newOrganisation, error: insertError } = await supabase
      .from("Organisation")
      .insert([
        {
          organisation_name: reqBody.organisation_name,
          address: reqBody.address,
          responsibility: reqBody.responsibility,
          division: reqBody.division,
          type: reqBody.type,
          order_index: newOrderIndex,
          start_date: reqBody.start_date,
          end_date: reqBody.end_date,
          cv_id: reqBody.cv_id,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    // 3. Fetch updated list of organisations
    const { data: organisations, error: fetchError } = await supabase
      .from("Organisation")
      .select("*")
      .eq("cv_id", reqBody.cv_id)
      .order("order_index", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      status: true,
      data: newOrganisation,
      organisations,
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    return NextResponse.json(
      {
        status: false,
        error: err.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}
