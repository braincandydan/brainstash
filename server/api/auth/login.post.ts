export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    try {
      // TODO: Replace with actual database validation
      if (body.email === 'test@example.com' && body.password === 'password') {
        return {
          token: 'fake-jwt-token',
          user: {
            id: '1',
            username: 'testuser',
            email: body.email,
            bio: 'Test bio',
            stats: {
              collections: 5,
              bookmarks: 23,
              followers: 10
            }
          }
        }
      }
      
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Login failed'
      })
    }
  })