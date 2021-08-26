
/**
 * A simple store to retain component state when unmounted
 */

const state = {} as Record<string, unknown>;

const store = (key: string) => ({
  set: (value: unknown): unknown => (state[key] = value),
  get: (): unknown => state[key],
});

export const customerSearch = store('customerSearch');

export default {
  customerSearch,
};
