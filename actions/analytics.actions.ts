'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Inquiry from '@/models/Inquiry';
import User from '@/models/User';

export async function getAnalyticsOverview() {
  try {
    await dbConnect();
    const [totalProducts, totalCategories, totalInquiries, totalUsers, closedDeals] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Inquiry.countDocuments(),
      User.countDocuments(),
      Inquiry.countDocuments({ status: 'Deal Closed' })
    ]);

    const conversionRate = totalInquiries > 0 ? ((closedDeals / totalInquiries) * 100).toFixed(2) : '0';

    return {
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalInquiries,
        totalUsers,
        conversionRate: `${conversionRate}%`
      }
    };
  } catch (error) {
    console.error("Error getting analytics overview:", error);
    return { success: false, error: 'Failed to fetch analytics overview' };
  }
}

export async function getInquiryTrends() {
  try {
    await dbConnect();
    
    // Get inquiries for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const trends = await Inquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    // Format data for Recharts
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDataMap = new Map();

    // Initialize the last 6 months with 0
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${months[d.getMonth()]} ${d.getFullYear()}`;
      formattedDataMap.set(key, { name: months[d.getMonth()], quotes: 0, contacts: 0 });
    }

    trends.forEach(item => {
      const monthName = months[item._id.month - 1];
      const key = `${monthName} ${item._id.year}`;
      if (formattedDataMap.has(key)) {
        const data = formattedDataMap.get(key);
        if (item._id.type === 'Product Quote') {
          data.quotes = item.count;
        } else {
          data.contacts = item.count;
        }
      }
    });

    return {
      success: true,
      data: Array.from(formattedDataMap.values()).reverse()
    };

  } catch (error) {
    console.error("Error getting inquiry trends:", error);
    return { success: false, error: 'Failed to fetch inquiry trends' };
  }
}

export async function getRecentInquiriesTableData() {
  try {
    await dbConnect();
    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(recentInquiries))
    };
  } catch (error) {
    console.error("Error getting recent inquiries:", error);
    return { success: false, error: 'Failed to fetch recent inquiries' };
  }
}
