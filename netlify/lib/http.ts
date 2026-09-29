// Adds a Mongo-style `_id` so existing frontend code keeps working.
export const withId = <T extends { id: number }>(row: T) => ({ ...row, _id: String(row.id) });

export const json = (body: unknown, status = 200) => Response.json(body, { status });
