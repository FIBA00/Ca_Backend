export default function RegisterRoutes(app) {
  app.use("/api/v1/examples", () => {
    return "hellow";
  });
}
