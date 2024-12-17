/**
 * @swagger
 * /api/profile-personalization:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Generate user personalization data
 *     description: Accepts user inputs like name, industry, style preferences, and color preferences to create a personalized recommendation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "The name of the user."
 *               industry:
 *                 type: string
 *                 example: "Fashion"
 *                 description: "The user's industry of interest."
 *               stylePreference:
 *                 type: string
 *                 example: "Minimalistic"
 *                 description: "The user's preferred style."
 *               colorPreference:
 *                 type: string
 *                 example: "Black and White"
 *                 description: "The user's preferred color scheme."
 *     responses:
 *       200:
 *         description: Successfully generated personalization data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personalization generated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     industry:
 *                       type: string
 *                       example: "Fashion"
 *                     recommendations:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Try these minimalistic designs in black and white."
 *       400:
 *         description: Bad request. Missing or invalid input data.
 *       500:
 *         description: Internal server error. Something went wrong during processing.
 */


export async function POST(_request: Request) {
	const { name, industry, stylePreference, colorPreference, networks } =
		await _request.json()
	//   const userInputs = {
	//     name, //: 'John Doe',
	//     industry, //: 'Fashion',
	//     stylePreference, //: 'Minimalistic',
	//     colorPreference, //: 'Black and White',
	//   }
	const prompt = `
    You are a digital profile designer. Based on the following inputs, suggest a design theme, layout, and color palette that aligns with the user’s brand identity:
    - Name: ${name}
    - Industry: ${industry}
    - Style Preference: ${stylePreference}
    - Color Preference: ${colorPreference}
	- Networks: ${networks}

	Example Input format for Networks:
	{
		"slug":"customlink",
		"name":"Test",
		"username": "https://gmail.com",
		"is_verified": true,
		"is_customlink": true,
		"category": "link",
		"avatar": "https://storage.googleapis.com/sprouter-buckets/social/socialwBBhiN3kJkS4M5C9fL0l64fJvCiJNSU2c8AlxXM6qH0032WtYpt3SAfb.jpg",
		"is_scheduled": "0",
	}

	Note: The category defines the type of networks for user like link, musicLink, customFiles,embed.

    Example Output format:
	{
		"slug": "customlink",
		"provider_id": null,
		"name": "Test",
		"username": "https://gmail.com",
		"token": null,
		"refresh_token": null,
		"category": "link",
		"expires_in": null,
		"expires_at": "NULL",
		"is_verified": true,
		"is_customlink": true,
		"is_textbox": true,
		"is_embed": null,
		"embed_code": null,
		"avatar": "https://storage.googleapis.com/sprouter-buckets/social/socialwBBhiN3kJkS4M5C9fL0l64fJvCiJNSU2c8AlxXM6qH0032WtYpt3SAfb.jpg",
		"is_scheduled": "0",
		"textbox": {
		"connection_id": 25850,
		"description": "",
		"box_type": "solid",
		"border_type": "curve",
		"text_align": "text-center",
		"text_color": "#000000FF",
		"border_color": "#C4C4C4FF",
		"background_color": "#FFFFFFFF",
		"is_layouts": 3
		}
	}

  `

	const payload = {
		contents: [ { "parts": [ { "text": prompt } ] } ]
	}

	const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
		method: "POST",
		body: JSON.stringify(payload)
	})
	const finalResult = await result.json()

	return new Response(JSON.stringify({
		data: finalResult
	}), {
		status: 200
	})
}