import { NextResponse } from "next/server";

export async function GET() {
    // Flask backend URL
    const API_URL = "http://127.0.0.1:5000/api/wildfires"; 
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }