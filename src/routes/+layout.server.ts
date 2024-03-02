export const load = async ({ locals }) => {
  return {
    authenticated: locals.user ? true : false,
  };
};
