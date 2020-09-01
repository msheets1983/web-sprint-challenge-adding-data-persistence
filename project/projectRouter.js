const express = require("express");
const data = require("./projectModel");
const router = express.Router();

router.get("/projects", async (req, res, next) => {
  try {
    const projects = await data.getAllProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/resources", async (req, res, next) => {
  try {
    const resources = await data.getAllResources();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.post("/projects", (req, res) => {
  const projectData = req.body;
  data
    .addProject(projectData)
    .then((project) => {
      res.status(201).json({
        Success: "Project was successfully created,",
      });
    })
    .catch((error) => {
      res.status(500).json({
        Error: "Failed to create project.",
      });
    });
});

router.post("/tasks", (req, res) => {
  const taskData = req.body;
  data
    .addTask(taskData)
    .then((task) => {
      res.status(201).json({
        Success: "Task was successfully created,",
      });
    })
    .catch((error) => {
      res.status(500).json({
        Error: "Failed to create task.",
      });
    });
});

router.post("/resources", (req, res) => {
  const resourceData = req.body;
  data
    .addResource(resourceData)
    .then((resource) => {
      res.status(201).json({
        Success: "Resource was successfully created,",
      });
    })
    .catch((error) => {
      res.status(500).json({
        Error: "Failed to create resource.",
      });
    });
});

router.get("/projects/:id/tasks", async (req, res, next) => {
  try {
    const project_tasks = await data.getProjectTasks(req.params.id);
    res.json(project_tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/projects/:id", async (req, res, next) => {
  try {
    const project_resources = await data.getProjects(req.params.id);
    res.json(project_resources);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
