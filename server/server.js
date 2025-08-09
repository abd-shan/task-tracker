const app = require('./src/app');

const PORT = process.env.PORT || 3000;

/**
 * Start Server
 */

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running!");
        console.log(`API Base URL: http://localhost:${PORT}`);
        console.log("Available endpoints:");
        console.log("  GET    /              - API Info");
        console.log("  GET    /tasks         - Fetch all tasks");
        console.log("  POST   /tasks         - Create a new task");
        console.log("  GET    /tasks/:id     - Get task by ID");
        console.log("  PUT    /tasks/:id     - Update a task");
        console.log("  DELETE /tasks/:id     - Delete a task");
        console.log("=".repeat(50));
    } else {

        console.log("Error occurred, server can't start", error);
    }
});
