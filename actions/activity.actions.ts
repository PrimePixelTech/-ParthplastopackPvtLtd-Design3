'use server';

import dbConnect from '@/lib/db';
import ActivityLog from '@/models/ActivityLog';

export async function getActivityLogs(limit = 50) {
  try {
    await dbConnect();
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return { 
      success: true, 
      logs: JSON.parse(JSON.stringify(logs)) 
    };
  } catch (error: any) {
    console.error('Error fetching activity logs:', error);
    return { success: false, error: error.message, logs: [] };
  }
}
