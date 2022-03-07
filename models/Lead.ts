import { dbConnection } from "../db/setup.ts";

interface LeadData {
  name: string;
}

export interface LeadRecord extends LeadData {
  id: number;
}

export class Lead implements LeadData {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public async save() {
    const { client, freeUp } = await dbConnection();
    try {
      await client.queryObject({
        text: `INSERT INTO leads (name) VALUES ($1)`,
        args: [this.name],
      });
      const result = (
        await client.queryObject<LeadRecord>({
          camelcase: true,
          text:
            `SELECT id::VARCHAR, name, created_at FROM leads ` +
            `WHERE name = $name ` +
            `ORDER BY created_at DESC LIMIT 1`,
          args: {
            name: this.name,
          },
        })
      ).rows[0];
      // crossRequests(result.id);
      return result;
    } catch (e) {
      throw e;
    } finally {
      freeUp();
    }
  }

  public valid() {
    // strip the registrationNumber of all non-digits and alphabets and upper-case it
    // check that the evaluatorId exists in the records
    // cleanup quotationPrice to make sure it is a float
  }
}

export async function findLead(name: string): Promise<LeadRecord[]> {
  const { client, freeUp } = await dbConnection();
  // do the pre-processing on the registrationNumber
  try {
    {
      const records = (
        await client.queryObject<LeadRecord>({
          text: `SELECT * FROM leads WHERE name = $1`,
          camelcase: true,
          args: [name],
        })
      ).rows;
      return records;
    }
  } catch (e) {
    throw e;
  } finally {
    freeUp();
  }
}
