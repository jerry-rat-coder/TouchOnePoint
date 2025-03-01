const { Client } = require('@notionhq/client')

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export function Thumbnail(body: any): string {
  return (
    (body && body[body?.type]?.url) ?? '/Tsunami_by_hokusai_19th_century.jpg'
  )
}
export function PageIcon(body: any): string {
  return (body && body[body?.type]?.url) ?? ''
}

export async function getData(): Promise<any> {
  const [BaseInfo, data] = await Promise.all([
    notion.databases.retrieve({
      database_id: process.env.DATABASE_ID,
    }),
    notion.databases.query({
      database_id: process.env.DATABASE_ID,
      filter: {
        property: 'Public',
        checkbox: {
          equals: true,
        },
      },
    }),
  ])
  return [BaseInfo, data]
}
