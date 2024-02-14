export default function handler(request: any, response: any) {
  console.log(request.query);

  if (request.method === "POST") {
    return response.status(200).json("Post");
  }

  if (request.method === "GET") {
    return response.status(200).json("Get")
  }
}