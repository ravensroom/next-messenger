import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    // it not authenticated, will go to signIn page
    signIn: '/',
  },
});

// all matching routes will need to secure authentification
export const config = {
  matcher: ['/users/:path*'],
};
