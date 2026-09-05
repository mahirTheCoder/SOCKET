
const BASE_URL = "http://localhost:8000/api/v1/massage";

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
};

// GET /massage/get-maggase  -> every message in the public room
export const getMessages = () => request(`/get-maggase`);

// POST /massage/send
export const sendMessage = (sender, text) => {
  return request(`/send`, {
    method: "POST",
    body: JSON.stringify({ sender, text }),
  });
};

// PUT /massage/edit-massage/:messageId
export const editMessage = (messageId, text) => {
  return request(`/edit-massage/${messageId}`, {
    method: "PUT",
    body: JSON.stringify({ text }),
  });
};

// DELETE /massage/del-massage/:messageId
export const deleteMessage = (messageId) => {
  return request(`/del-massage/${messageId}`, {
    method: "DELETE",
  });
};
