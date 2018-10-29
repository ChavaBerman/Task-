using BLL;
using BOL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace webAPI_tasks.Controllers
{
    public class TaskController : ApiController
    {
        [Route("api/Tasks/AddTask")]
        // POST: api/Users
        public HttpResponseMessage Post([FromBody] Task value)
        {
            if (ModelState.IsValid)
            {
                if (LogicTask.CheckIfExists(value))
                    return Request.CreateResponse(HttpStatusCode.Found, "Worker already exists in this project.");
                return (LogicTask.AddTask(value)) ?
                    Request.CreateResponse(HttpStatusCode.Created) :
                    Request.CreateResponse(HttpStatusCode.BadRequest, "Can not add to DB.");
            };

            List<string> ErrorList = new List<string>();

            //if the code reached this part - the user is not valid
            foreach (var item in ModelState.Values)
                foreach (var err in item.Errors)
                    ErrorList.Add(err.ErrorMessage);

            return new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new ObjectContent<List<string>>(ErrorList, new JsonMediaTypeFormatter())
            };

        }

        [HttpGet]
        [Route("api/Tasks/GetTasksWithUserAndProjectByProjectId/{projectId}")]
        public HttpResponseMessage GetTasksWithUserAndProjectByProjectId(int projectId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<Task>>(LogicTask.GetTasksWithUserAndProjectByProjectId(projectId), new JsonMediaTypeFormatter())
            };
        }

        [HttpGet]
        [Route("api/Tasks/GetTasksWithUserAndProjectByUserId/{userId}")]
        public HttpResponseMessage GetTasksWithUserAndProjectByUserId(int userId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<Task>>(LogicTask.GetTasksWithUserAndProjectByUserId(userId), new JsonMediaTypeFormatter())
            };
        }

        [HttpPut]
        [Route("api/Tasks/UpdateTask")]
        public HttpResponseMessage Put([FromBody]Task value)
        {

            if (ModelState.IsValid)
            {
                return (LogicTask.UpdateTask(value)) ?
                    new HttpResponseMessage(HttpStatusCode.OK) :
                    new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new ObjectContent<String>("Can not update in DB", new JsonMediaTypeFormatter())
                    };
            };

            List<string> ErrorList = new List<string>();

            //if the code reached this part - the user is not valid
            foreach (var item in ModelState.Values)
                foreach (var err in item.Errors)
                    ErrorList.Add(err.ErrorMessage);

            return new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new ObjectContent<List<string>>(ErrorList, new JsonMediaTypeFormatter())
            };
        }

        [HttpGet]
        [Route("api/Users/GetWorkerTasksDictionary/{id}")]
        public HttpResponseMessage GetWorkerTasksDictionary(int id)
        {

            return new HttpResponseMessage(HttpStatusCode.OK)
            {

                Content = new ObjectContent<Dictionary<string, decimal>>(LogicTask.GetWorkerTasksDictionary(id), new JsonMediaTypeFormatter())
            };
        }
    }
}
