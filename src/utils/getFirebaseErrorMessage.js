export function getFirebaseErrorMessage(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/user-not-found':
      return "No account found with this email. Try signing up first.";
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/invalid-email':
      return 'That email address looks invalid.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    case 'auth/account-exists-with-different-credential':
      return 'This email is already used with a different sign-in method.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled before completing.';
    default:
      return 'Something went wrong. Please try again.';
  }
}