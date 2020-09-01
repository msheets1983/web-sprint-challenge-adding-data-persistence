const db = require("../data/dbconfig");

module.exports = {
  getAllProjects,
  getAllResources,
  addProject,
  addTask,
  addResource,
  getProjectTasks,
  getProjects,
};

function getAllProjects() {
  return db("projects");
}

function getAllResources() {
  return db("resources");
}

function addProject(project) {
  return db("projects").insert(project);
}

function addTask(task) {
  return db("tasks").insert(task);
}

function addResource(resource) {
  return db("resources").insert(resource);
}

function getProjectTasks(projects_id) {
  return db("project_tasks as pt")
    .join("tasks as t", "t.id", "pt.tasks_id")
    .join("projects as p", "p.id", "pt.projects_id")
    .where({ projects_id });
}

function getProjects(projects_id) {
  return db("project_resources").select("*").where({ projects_id });
}
