import "@testing-library/jest-dom";
import useStore, { StoreState } from "./src/store/useStore";

// First, we turn the useStore hook into a jest mock
jest.mock("./src/store/useStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// jest.mocked allows us to keep type safety on useStore's defined types
// when defining mock implementation values
const useStoreMock = jest.mocked(useStore);

// We will import this method into our tests, allowing them to specify
// only those store values the test needs to care about
export const mockUseStore = (overrides: Partial<StoreState> = {}) => {
  useStoreMock.mockImplementation((getterFn) => {
    return getterFn({
      // We include the store's actual values by default
      // This allows the mocked store to have complete functionality,
      // with "granular" mocks defined as specified by tests
      ...jest.requireActual("./src/store/useStore").default(),
      ...overrides,
    });
  });
};

// This will set the default mock for the store on a per-test basis
beforeEach(() => {
  mockUseStore();
});
