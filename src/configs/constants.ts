export const ENDPOINT_URL = "https://jsonplaceholder.typicode.com" as const;

export const RESOURCES_NAME = {
  albums: {
    root: "albums",
    list: "/albums",
    show: "/albums/show/:id",
  },
  users: {
    root: "users",
    list: "/users",
    show: "/users/show/:id",
  },
  photos: {
    root: "photos",
  },
};
