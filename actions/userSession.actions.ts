'use server';

import dbConnect from '@/lib/db';
import UserSession from '@/models/UserSession';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { revalidatePath } from 'next/cache';

export async function getActiveSessions() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return { success: false, error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    const currentSessionId = (session.user as any).sessionId;

    const sessions = await UserSession.find({ userId, isActive: true })
      .sort({ lastActive: -1 })
      .lean();

    const formattedSessions = sessions.map((s) => ({
      id: s._id.toString(),
      sessionId: s.sessionId,
      device: s.device,
      browser: s.browser,
      location: s.location,
      ipAddress: s.ipAddress,
      lastActive: s.lastActive,
      isCurrent: s.sessionId === currentSessionId,
    }));

    return { success: true, sessions: formattedSessions };
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return { success: false, error: 'Failed to fetch sessions' };
  }
}

export async function revokeSession(sessionIdToRevoke: string) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return { success: false, error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;

    await UserSession.findOneAndUpdate(
      { sessionId: sessionIdToRevoke, userId },
      { isActive: false }
    );

    revalidatePath('/admin/settings');
    return { success: true };
  } catch (error) {
    console.error('Error revoking session:', error);
    return { success: false, error: 'Failed to revoke session' };
  }
}

export async function revokeAllOtherSessions() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return { success: false, error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    const currentSessionId = (session.user as any).sessionId;

    await UserSession.updateMany(
      { userId, sessionId: { $ne: currentSessionId }, isActive: true },
      { isActive: false }
    );

    revalidatePath('/admin/settings');
    return { success: true };
  } catch (error) {
    console.error('Error revoking sessions:', error);
    return { success: false, error: 'Failed to revoke sessions' };
  }
}
