export async function authExample(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
          
        },
      } = ctx
  
    console.info('Midleware example:')
    console.log(ctx.vtex.authToken)
  
    await next()
  }