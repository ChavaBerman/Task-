
using BLL;
using BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace webAPI_tasks.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProjectsController : ApiController
    {
        [HttpGet]
        [Route("api/Projects/GetAllProjects")]
        public HttpResponseMessage GetAllProjects()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<Project>>(LogicProjects.GetAllProjects(), new JsonMediaTypeFormatter())
            };
        }
        [HttpGet]
        [Route("api/Projects/GetAllProjectsByTeamHead/{TeamHeadId}")]
        public HttpResponseMessage GetAllProjectsByTeamHead(int teamHeadId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<Project>>(LogicProjects.GetAllProjectsByTeamHead(teamHeadId), new JsonMediaTypeFormatter())
            };
        }

        [HttpGet]
        [Route("api/Projects/GetAllProjectsByWorker/{WorkerId}")]
        public HttpResponseMessage GetAllProjectsByWorker(int WorkerId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<Project>>(LogicProjects.GetAllProjectsByWorker(WorkerId), new JsonMediaTypeFormatter())
            };
        }
        [HttpGet]
        [Route("api/Projects/GetProjectDetails")]
        public HttpResponseMessage GetProjectDetails(string projectName)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<Project>(LogicProjects.GetProjectDetails(projectName), new JsonMediaTypeFormatter())
            };
        }
        [HttpGet]
        [Route("api/Projects/GetProjectState/{idProject}")]
        public HttpResponseMessage GetProjectState(int idProject)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<decimal>(LogicProjects.GetProjectState(idProject), new JsonMediaTypeFormatter())
            };
        }

        [HttpPost]
        [Route("api/Projects/AddProject")]
        public HttpResponseMessage AddProject([FromBody]Project value)
        {
            if (ModelState.IsValid)
            {
                return (LogicProjects.AddProject(value)) ?
                   new HttpResponseMessage(HttpStatusCode.Created) :
                   new HttpResponseMessage(HttpStatusCode.BadRequest)
                   {
                       Content = new ObjectContent<String>("Can not add to DB", new JsonMediaTypeFormatter())
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

        // PUT: api/Projects/5
        //public HttpResponseMessage Put([FromBody]Project value)
        //{

        //    if (ModelState.IsValid)
        //    {
        //        return (LogicProjects.UpdateProject(value)) ?
        //            new HttpResponseMessage(HttpStatusCode.OK) :
        //            new HttpResponseMessage(HttpStatusCode.BadRequest)
        //            {
        //                Content = new ObjectContent<String>("Can not update in DB", new JsonMediaTypeFormatter())
        //            };
        //    };

        //    List<string> ErrorList = new List<string>();

        //    //if the code reached this part - the user is not valid
        //    foreach (var item in ModelState.Values)
        //        foreach (var err in item.Errors)
        //            ErrorList.Add(err.ErrorMessage);

        //    return new HttpResponseMessage(HttpStatusCode.BadRequest)
        //    {
        //        Content = new ObjectContent<List<string>>(ErrorList, new JsonMediaTypeFormatter())
        //    };
        //}


        public HttpResponseMessage Put([FromBody]int projectId, [FromBody]List<User> workers)
        {

            if (ModelState.IsValid)
            {
                return (LogicProjects.AddWorkerToProject(projectId, workers)) ?
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

        // DELETE: api/Projects/5
        public HttpResponseMessage Delete(string projectName)
        {
            return (LogicProjects.RemoveProject(projectName)) ?
                    new HttpResponseMessage(HttpStatusCode.OK) :
                    new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new ObjectContent<String>("Can not remove from DB", new JsonMediaTypeFormatter())
                    };
        }
    }
}
