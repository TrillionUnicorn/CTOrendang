import { json } from "@sveltejs/kit";
const GET = async () => {
  return json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "1.0.0"
  });
};
export {
  GET
};
