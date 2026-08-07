import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("Testing insert...");
  const { data, error } = await supabase
    .from('prescriptions')
    .insert([{ 
      patient_name: "Test",
      notes: "Test notes",
      approval_status: "pending"
    }])
    .select()
    .single();

  if (error) {
    console.error("Insert failed:", JSON.stringify(error, null, 2));
  } else {
    console.log("Insert success:", data);
  }
}

testInsert();
