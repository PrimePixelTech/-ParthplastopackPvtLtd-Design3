import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow access to /admin/login without a token
      if (req.nextUrl.pathname === '/admin/login') {
        return true;
      }
      
      // All other /admin routes require authentication
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return !!token;
      }
      
      return true;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};
