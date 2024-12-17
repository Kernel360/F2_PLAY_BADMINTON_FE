const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// TODO: class 화 해보는 것도 좋을듯
const restClient = {
  get: async <T>(url: string) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      // Note: Next.js의 default fetch caching 전략: 'force-cache' [서버]
      // https://nextjs.org/docs/14/app/building-your-application/caching#fetch
      // no-store를 통해서 이전에 서버에서 fetching 하는 것들의 캐싱을 막아줘야 예상 밖의 동작이 일어나지 않는다
      cache: "no-store",
    });

    const data = await response.json();
    return data as T;
  },
  post: async <T>(url: string, body?: object) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  },
  postImage: async <T>(url: string, image: FormData) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      credentials: "include",
      body: image,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  },
  patch: async <T>(url: string, body: object) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // return response as T;
    return data as T;
  },
  put: async <T>(url: string, body: object) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  },
  delete: async <T>(url: string) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // return response as T;
    return data as T;
  },
};

export default restClient;
