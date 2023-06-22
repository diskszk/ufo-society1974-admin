import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";
import { cleanup } from "@testing-library/react";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
afterEach(() => cleanup());
