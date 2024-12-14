/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */

// @ts-ignore
export async function GET(_request: Request) {
  // Do whatever you want
  const requestMethod = _request.method
  return new Response('Hello World!' + `${requestMethod || 'GET'}`, {
    status: 200,
  })
}
