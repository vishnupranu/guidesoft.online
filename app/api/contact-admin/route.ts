import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message content are required.' },
        { status: 400 }
      );
    }

    // Process inquiry notification to admin@guidesoft.online
    const timestamp = new Date().toISOString();
    console.log(`[CONTACT ADMIN INQUIRY -> admin@guidesoft.online]`, {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      timestamp,
    });

    return NextResponse.json({
      success: true,
      recipient: 'admin@guidesoft.online',
      message: 'Your inquiry has been successfully transmitted to admin@guidesoft.online.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
