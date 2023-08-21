export const initialState = {
    status: "checking", // "checking" | "authenticated" | "unauthenticated"
    uuid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    accessToken: null
}

export const authenticatedState = {
    status: "authenticated", // "checking" | "authenticated" | "unauthenticated"
    uuid: "ABC1234567890",
    email: "demo.user@gmail.com",
    displayName: "Demo User",
    photoURL: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    errorMessage: null,
    accessToken: "ABC1234567890"
}


export const unauthenticatedState = {
    status: "unauthenticated", // "checking" | "authenticated" | "unauthenticated"
    uuid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    accessToken: null
}

export const userTest = {
    uuid: "ABC1234567890",
    email: "demo.user@gmail.com",
    displayName: "Demo User",
    photoURL: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    errorMessage: null,
    accessToken: "ABC1234567890"
}


export const checkingState = {
    status: "checking",
    uuid: null,
    email: null,
    displayName: null,
    photoURL: null,
    accessToken: null,
    errorMessage: null
}