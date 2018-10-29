using Client_WinForm.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Client_WinForm.Requests
{
    class UserRequests
    {
        public static List<User> GetAllUsers()
        {
            List<User> allUsers = new List<User>();

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(@"http://localhost:61309/api/Users/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("GetAllUsers").Result;
            if (response.IsSuccessStatusCode)
            {
                var usersJson = response.Content.ReadAsStringAsync().Result;
                allUsers = JsonConvert.DeserializeObject<List<User>>(usersJson);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return allUsers;
        }

        public static List<User> GetAllWorkers()
        {
            List<User> allWorkers = new List<User>();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(@"http://localhost:61309/api/Users/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("GetAllWorkers").Result;
            if (response.IsSuccessStatusCode)
            {
                var usersJson = response.Content.ReadAsStringAsync().Result;
                allWorkers = JsonConvert.DeserializeObject<List<User>>(usersJson);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return allWorkers;
        }

        public static List<User> GetWorkersByTeamhead(int id)
        {
            List<User> allWorkers = new List<User>();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(@"http://localhost:61309/api/Users/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync($"GetWorkersByTeamhead/{id}").Result;
            if (response.IsSuccessStatusCode)
            {
                var usersJson = response.Content.ReadAsStringAsync().Result;
                allWorkers = JsonConvert.DeserializeObject<List<User>>(usersJson);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return allWorkers;
        }
        public static Dictionary<string, decimal> GetWorkersDictionary(int id)
        {
            Dictionary<string, decimal> allWorkers = new Dictionary<string, decimal>();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(@"http://localhost:61309/api/Users/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync($"GetWorkersDictionary/{id}").Result;
            if (response.IsSuccessStatusCode)
            {
                var usersJson = response.Content.ReadAsStringAsync().Result;
                allWorkers = JsonConvert.DeserializeObject<Dictionary<string, decimal>>(usersJson);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return allWorkers;
        }
        
        public static List<User> GetAllTeamHeads()
        {
            List<User> teamHeads = new List<User>();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(@"http://localhost:61309/api/Users/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("GetAllTeamHeads").Result;
            if (response.IsSuccessStatusCode)
            {
                var usersJson = response.Content.ReadAsStringAsync().Result;
                teamHeads = JsonConvert.DeserializeObject<List<User>>(usersJson);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return teamHeads;
        }

        public static bool UpdateUser(User user)
        {
            try
            {
                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create($@"http://localhost:61309/api/Users");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "PUT";
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    dynamic currentUser = user;
                    string currentUserNameString = Newtonsoft.Json.JsonConvert.SerializeObject(currentUser, Formatting.None);
                    streamWriter.Write(currentUserNameString);
                    streamWriter.Flush();
                    streamWriter.Close();
                }
                //Get response
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                //Read response
                using (var streamReaderPUT = new StreamReader(httpResponse.GetResponseStream(), ASCIIEncoding.ASCII))
                {
                    string resultPUT = streamReaderPUT.ReadToEnd();
                    //If request succeeded
                    if (httpResponse.StatusCode == HttpStatusCode.OK)
                    {
                        return true;

                    }
                    //Print the matching error
                    else return false;

                }
            }
            catch (Exception exception)
            {
                return false;
            }
        }

        public static bool sendMessageToManager(int idUser,string message, string subject)
        {
            try
            {
                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create($@"http://localhost:61309/api/sendMessageToManager/{idUser}/{subject}");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "PUT";
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    dynamic messageToSend = message;
                    string currentmessageToSend = Newtonsoft.Json.JsonConvert.SerializeObject(messageToSend, Formatting.None);
                    streamWriter.Write(currentmessageToSend);
                    streamWriter.Flush();
                    streamWriter.Close();
                }
                //Get response
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                //Read response
                using (var streamReaderPUT = new StreamReader(httpResponse.GetResponseStream(), ASCIIEncoding.ASCII))
                {
                    string resultPUT = streamReaderPUT.ReadToEnd();
                    //If request succeeded
                    if (httpResponse.StatusCode == HttpStatusCode.OK)
                    {
                        return true;

                    }
                    //Print the matching error
                    else return false;

                }
            }
            catch
            {
                return false;
            }
        }

        public static bool DeleteUser(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:61309/");
                HttpResponseMessage response = client.DeleteAsync($"api/Users/{id}").Result;
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                    return false;
            }
            
        }

        public static bool AddUser(User Newuser)
        {
            try
            {
                //Post Request for Register
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(@"http://localhost:61309/api/addUser");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string user = JsonConvert.SerializeObject(Newuser, Formatting.None);

                    streamWriter.Write(user);
                    streamWriter.Flush();
                    streamWriter.Close();
                }
                //Gettting response
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                //Reading response
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream(), ASCIIEncoding.ASCII))
                {
                    string result = streamReader.ReadToEnd();
                    //If Register succeeded
                    if (httpResponse.StatusCode == HttpStatusCode.Created)
                    {


                        return true;
                    }
                    //Printing the matching error
                    
                }
            }
            catch (Exception exception)
            {
                System.Windows.Forms.MessageBox.Show("failed to add");

            }
            return false;
        }


    }
}
