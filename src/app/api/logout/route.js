import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const response = NextResponse.json({
      message: 'Logged out successfully',
      success: true,
    })
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })
    return response
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}