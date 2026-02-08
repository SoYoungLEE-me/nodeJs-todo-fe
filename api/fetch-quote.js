export default async function (request, response) {
  try {
    const res = await fetch("https://type.fit/api/quotes");

    if (!res.ok) {
      throw new Error("외부 API 응답 에러");
    }

    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
