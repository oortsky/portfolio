import { reader } from '@/lib/keystatic';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await reader.collections.projects.all();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}