import { reader } from '@/lib/keystatic';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await reader.collections.posts.all();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}