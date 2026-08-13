import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import UserSession from '@/models/UserSession';
import crypto from 'crypto';
import { UAParser } from 'ua-parser-js';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) {
          throw new Error('Invalid email or password');
        }
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
          throw new Error('Invalid email or password');
        }

        // --- SESSION TRACKING LOGIC ---
        const userAgent = req?.headers?.['user-agent'] || 'Unknown';
        
        let ipAddress = req?.headers?.['x-forwarded-for'] || 'Unknown';
        if (Array.isArray(ipAddress)) {
          ipAddress = ipAddress[0];
        } else if (ipAddress.includes(',')) {
          ipAddress = ipAddress.split(',')[0];
        }

        const parser = new UAParser(userAgent);
        const browser = parser.getBrowser();
        const os = parser.getOS();
        const device = parser.getDevice();
        
        const deviceString = `${device.vendor || ''} ${device.model || os.name || 'Desktop'}`.trim();
        const browserString = `${browser.name || 'Unknown'} ${browser.version || ''}`.trim();

        const sessionId = crypto.randomUUID();

        await UserSession.create({
          userId: user._id,
          sessionId: sessionId,
          userAgent: userAgent,
          ipAddress: ipAddress,
          device: deviceString || 'Desktop',
          browser: browserString || 'Unknown',
          location: 'Unknown',
          isActive: true
        });
        // --- END SESSION TRACKING ---

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          sessionId: sessionId,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.sessionId = (user as any).sessionId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).sessionId = token.sessionId;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'parth-plasto-pack-super-secret-key-2026',
  pages: {
    signIn: '/admin/login',
  }
};
