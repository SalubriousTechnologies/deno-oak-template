import { join, walkSync } from "../../test/setup.ts";
import { dbConnection } from "../setup.ts";

const env = Deno.env.get("DENO_ENV");

const DIRECTORY_PATH = join(".", "db", "fixtures");
const FILE_EXTENSION = ".json";

// return a function to update the fixtures
async function setupFixtures(filename = "") {
  if (env === "testing") {
    if (filename.length === 0) {
      const fileList = fileNamesList();
      for (const file of fileList) {
        addToTable(file);
      }
    } else {
      await addToTable(filename);
    }
  } else {
    console.log(
      `Not cleaning up anything as environment variables indicate non-testing environment`
    );
  }
}

// return a function to tear down the fixtures

async function cleanUpFixtures() {
  if (env === "testing") {
    // walk through the fixtures directory and list all the files
    const fileList = fileNamesList();
    for await (const file of fileList) {
      cleanupTable(file);
    }
    // parse the names and run the pg `DELETE FROM TABLE_NAME` command to delete all data from the
  } else {
    console.log(
      `Not cleaning up anything as environment variables indicate non-testing environment`
    );
  }
}

function fileNamesList(): string[] {
  const fileList: string[] = [];
  for (const entry of walkSync(DIRECTORY_PATH)) {
    const file = entry.path.split(FILE_EXTENSION);
    // const file = entry.path.split(DIRECTORY_PATH)[1]
    if (file.length > 1) {
      // TODO(standvpmnt): This isn't easy to follow along modify this for better readability
      fileList.push(file[0].split(DIRECTORY_PATH)[1].slice(1));
    }
  }
  return fileList;
}

async function addToTable(filename: string) {
  const { client, freeUp } = await dbConnection();
  Deno.readTextFile(join(DIRECTORY_PATH, filename + FILE_EXTENSION))
    .then((text) => JSON.parse(text))
    .then(async (data) => {
      for await (const item of data) {
        const keys = Object.keys(item);
        const values = keys.map((key) => item[key]);
        const query = `INSERT INTO ${filename} (${keys.join(
          ", "
        )}) VALUES (${values.join(", ")})`;
        try {
          await client.queryArray(query);
        } catch (e) {
          console.error(`Error in adding to table for ${filename}`);
          console.log(`Issue with query ${query}`);
          console.error(e);
        }
      }
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => freeUp());
}

async function cleanupTable(filename: string) {
  const { client, freeUp } = await dbConnection();
  try {
    await client.queryArray(`DELETE FROM ${filename}`);
  } catch (e) {
    console.error(e);
    console.error(`Error encountered in deleting ${filename}}`);
  } finally {
    freeUp();
  }
}

await cleanUpFixtures();
// await setupFixtures("leads");
