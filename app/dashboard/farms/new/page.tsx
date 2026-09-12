"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function AddFarmPage(){
const [name,setName]=useState("");
const [location,setLocation]=useState("");
async function saveFarm(e:any){e.preventDefault();const {data}=await supabase.auth.getUser();if(!data.user){alert("Please sign in first");return}const {error}=await supabase.from("farms").insert({user_id:data.user.id,name,location});if(error)alert(error.message);else{alert("Farm saved successfully");setName("");setLocation("")}}
return <main className="min-h-screen bg-green-50 p-8"><div className="mx-auto max-w-2xl"><h1 className="text-3xl font-bold text-green-950">Add Farm</h1><p className="mt-2 text-gray-600">Add a new poultry farm.</p><form onSubmit={saveFarm} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow"><div><label className="block font-medium">Farm Name</label><input value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full rounded-lg border p-3" placeholder="e.g. Abdullahi Poultry Farm" required/></div><div><label className="block font-medium">Farm Location</label><input value={location} onChange={e=>setLocation(e.target.value)} className="mt-2 w-full rounded-lg border p-3" placeholder="e.g. Gaya, Kano State"/></div><button type="submit" className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white">Save Farm</button></form></div></main>
}
