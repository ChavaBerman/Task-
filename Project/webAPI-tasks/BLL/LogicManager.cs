
using DAL;
using BOL;
using BOL.Convertors;
using BOL.HelpModel;
using BOL.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Net.Mail;

namespace BLL
{
    public class LogicManager
    {

        public static List<User> GetAllUsers()
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus;";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            return DBAccess.RunReader(query, func);
        }

        public static List<User> GetAllWorkersByTeamId(int id)
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus WHERE managerId={id};";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            return DBAccess.RunReader(query, func);
        }
        public static List<Project> GetProjectsUser(int id)
        {
            string query = $"SELECT * FROM task.projectworker WHERE workerId={id} ;";
            List<Project> projects = new List<Project>();
            Func<MySqlDataReader, List<PresentDay>> func = (reader) =>
            {
                List<PresentDay> projectsWorker = new List<PresentDay>();
                while (reader.Read())
                {
                    projectsWorker.Add(ConvertorPresentDay.convertDBtoProjectWorker(reader));
                }
                return projectsWorker;
            };

            List<PresentDay> ProjectWorker = DBAccess.RunReader(query, func);
            foreach (var item in ProjectWorker)
            {
                projects.Add(LogicProjects.GetProjectDetails(item.ProjectId));
            }

            return projects;
        }

        public static List<User> GetWorkersByTeamhead(int teamHeadId)
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus WHERE task.user.managerId={teamHeadId};";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            return DBAccess.RunReader(query, func);
        }

        public static Dictionary<string, decimal> GetWorkersDictionary(int id)
        {
            List<User> users = new List<User>(); users = GetWorkersByTeamhead(id);
            Dictionary<string, decimal> workersDictionary = new Dictionary<string, decimal>();
            List<decimal> yValues = users.Select(p => p.NumHoursWork).ToList();
            List<string> xValues = users.Select(p => p.UserName).ToList();
            for (int i = 0; i < yValues.Count; i++)
            {
                workersDictionary.Add(xValues[i], yValues[i]);
            }
            return workersDictionary;
        }

        public static List<User> GetAllowedWorkers(int teamHeadId)
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus WHERE task.status.statusname!='TeamHead' and task.status.statusname!='Manager' and task.user.managerId!={teamHeadId};";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            return DBAccess.RunReader(query, func);
        }

        public static List<User> GetAllTeamHeads()
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus WHERE task.status.statusname='TeamHead';";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            return DBAccess.RunReader(query, func);
        }
        public static List<User> GetAllWorkers()
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus WHERE task.status.statusname!='TeamHead' and task.status.statusname!='Manager';";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            return DBAccess.RunReader(query, func);
        }

        public static User GetUserDetails(int id)
        {
            string query = $"SELECT * FROM task.user JOIN task.status ON user.IdStatus=status.IdStatus WHERE idUser={id}";
            List<User> users = new List<User>();
            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> projectsWorker = new List<User>();
                while (reader.Read())
                {
                    projectsWorker.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return projectsWorker;
            };
            List<User> users1 = DBAccess.RunReader(query, func);
            return users1.Count > 0 ? users1[0] as User : null;
        }
        public static User GetManager()
        {
            string query = "SELECT * FROM task.user JOIN task.status ON task.user.IdStatus=task.status.IdStatus WHERE task.status.statusname='Manager';";
            List<User> managers = new List<User>();
            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> manager = new List<User>();
                while (reader.Read())
                {
                    manager.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return manager;
            };
            managers = DBAccess.RunReader(query, func);
            return managers.Count > 0 ? managers[0] as User : null;
        }

        public static User GetUserDetailsByPassword(string password, string userName)
        {
            //TODO:לעשות פונקציה שבודקת תווים מיוחדים עי סטור ופונקציה
            string query = $"SELECT * FROM task.user JOIN task.status ON user.IdStatus=status.IdStatus  WHERE password='{password}' and username='{userName}'";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));
                }
                return users;
            };

            List<User> usersLogin = DBAccess.RunReader(query, func);
            if (usersLogin != null && usersLogin.Count > 0)
            {

                return usersLogin[0];
            }
            return null;

        }

        public static bool RemoveUser(int id)
        {
            string query = $"DELETE FROM task.user WHERE idUser={id};";
            return DBAccess.RunNonQuery(query) == 1;
        }


        //-------------------------------------------

        public static bool UpdateUser(User user)
        {
            string query = $"UPDATE task.user SET userName='{user.UserName}',password='{user.Password}',email='{user.Email}',IdStatus={user.StatusId}  ,totalhours={user.NumHoursWork},managerId={user.ManagerId},userComputer='{user.UserComputer}'  WHERE idUser={user.UserId} ;";
            return DBAccess.RunNonQuery(query) == 1;
        }

        public static bool AddUser(User user)
        {

            //TODO:איזה דפרטמנט
            string query = $"INSERT INTO `task`.`user`(`userName`,`password`,`email`,`IdStatus`,`totalhours`,`managerId`,`userComputer`) VALUES('{user.UserName}','{user.Password}','{user.Email}',{user.StatusId},{user.NumHoursWork},{user.ManagerId},'{user.UserComputer}'); ";
            return DBAccess.RunNonQuery(query) == 1;
        }

        public static User GetUserDetailsComputerUser(string computerUser)
        {
            string query = $"USE task;SELECT * FROM task.user JOIN task.status ON user.IdStatus=status.IdStatus WHERE userComputer='{computerUser}'";

            Func<MySqlDataReader, List<User>> func = (reader) =>
            {
                List<User> users = new List<User>();
                while (reader.Read())
                {
                    users.Add(ConvertorUser.convertDBtoUser(reader));

                }
                return users;
            };

            List<User> usersLogin = DBAccess.RunReader(query, func);
            if (usersLogin != null && usersLogin.Count > 0)
            {

                return usersLogin[0];
            }
            return null;
        }
        public static bool sendEmailToManager(int idUser, string message, string subject)
        {
            User manager = GetManager();
            User user = GetUserDetails(idUser);
            if (manager == null)
                return false;
            message += $"< br />< span style = 'color:red' > sincerly,{ user.UserName}< span />";
            return sendMessage(manager, message, subject);

        }
        public static bool sendMessage(User user, string message, string subject)
        {
          
            if (user == null)
                return false;
            SmtpClient client = new SmtpClient();
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("task.FrishmanBerman@gmail.com", "task1234");
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress("task.FrishmanBerman@gmail.com");
            msg.To.Add(new MailAddress(user.Email));
            msg.Subject = subject;
            msg.IsBodyHtml = true;
            msg.Body = string.Format($"<html><head>הודעה שנשלחה</head><body><p>{message}</br></p></body>");
            try
            {
                client.Send(msg);
                return true;
            }
            catch
            {
                return false;

            }
        }
    }
}


