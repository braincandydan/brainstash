export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    try {
      // TODO: Replace with actual database creation
      return {
        token: 'fake-jwt-token',
        user: {
          id: '1',
          username: body.username,
          email: body.email,
          bio: '',
          stats: {
            collections: 0,
            bookmarks: 0,
            followers: 0
          }
        }
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Registration failed'
      })
    }
  })