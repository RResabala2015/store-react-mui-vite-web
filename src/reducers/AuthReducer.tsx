export interface Action {
  type: string;
  payload?: unknown;
}

const isAuthenticated = { loggedIn: false };

export function AuthReducer(state = isAuthenticated, action: Action) {
  switch (action.type) {
    case 'login':
      return { ...(action.payload as Record<string, unknown>), loggedIn: true };
    case 'logout':
      return { loggedIn: false };
    default:
      return state;
  }
}
