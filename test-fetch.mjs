import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  const { data, error } = await supabase.from('prescriptions').select('*');
  if (error) {
    console.error("Error fetching:", error);
  } else {
    console.log("Prescriptions:", data.map(d => ({
      id: d.id,
      image_url: d.image_url,
      has_image_data: !!d.image_data
    })));
  }
}

testFetch();
