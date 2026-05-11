import { mockDataSource } from "./mock-adapter";
import type { DataSource } from "./types";

function createDataSource(): DataSource {
  const source = process.env.IMYVM_DATA_SOURCE ?? "mock";

  if (source === "mock") {
    return mockDataSource;
  }

  throw new Error(`Unsupported IMYVM_DATA_SOURCE: ${source}`);
}

export const dataSource = createDataSource();
