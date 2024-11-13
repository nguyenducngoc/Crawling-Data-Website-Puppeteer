import { createClient } from "../node_modules/@supabase/supabase-js";
const a = () => {
   
  console.log("a");
};
a();
document.addEventListener("DOMContentLoaded", a);
// const supabaseUrl = 'https://eewlfvfpotbjkllqvkka.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

// const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVld2xmdmZwb3RiamtsbHF2a2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3OTY3MjMsImV4cCI6MTk3NTM3MjcyM30.sLO8m0_QuY1rvD9gEXFwdMHM1vV-0utUI4m9IdBkW4c"
// const { createClient } = supabase
// const _supabase = createClient('https://eewlfvfpotbjkllqvkka.supabase.co', `${apikey}`)

// console.log('Supabase Instance: ', supabase)
// const getTest = async () => {
//     const { user, session, error } =
//     await _supabase.auth.signUp( {
//     email: 'klrt0120@gmail.com',
//     password: 'example-password',
//     })
//     console.log(user)

//     const config = {
//             method : 'GET',
//             headers : {
//                 'Accept': 'application/json',
//                  'Content-Type': 'application/json',
//                  'apikey' : apikey ,
//             },
//             // body: JSON.stringify(user)
//         }
//    try {

//         const respon = await fetch("https://eewlfvfpotbjkllqvkka.supabase.co/rest/v1/items",config)
//         const data = await respon.json() ;
//         console.log(data) ;
//    } catch (error) {
//         console.log(error)
//    }
// }
