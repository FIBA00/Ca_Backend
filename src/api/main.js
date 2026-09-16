import userRoute from "./users/users.route.js";


export default function RegisterRoutes ( app )
{
  app.use("/api/user", userRoute)
}