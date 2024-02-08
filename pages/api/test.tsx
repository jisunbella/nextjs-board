export default function handler(request: any, response: any) {
  if (request.method === "POST") {
    return response.status(200).json("Post");
  }

  if (request.method === "GET") {
    return response.status(200).json("Get")
  }
}