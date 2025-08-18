import app from "./app.js";

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, "0.0.0.0", async () => {
    const os = await import("os");
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          addresses.push(iface.address);
        }
      }
    }
    console.log("Server is running on:");
    addresses.forEach(addr => {
      console.log(`http://${addr}:${PORT}`);
    });
    console.log(`http://localhost:${PORT}`);
  });
}
