using Client_WinForm.Models;
using Client_WinForm.Requests;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Client_WinForm.TeamHead
{
    public partial class HoursChart : Form
    {
        public HoursChart(User TeamHead)
        {
            
            InitializeComponent();


            Dictionary<string, decimal> workersDictionary = new Dictionary<string, decimal>();
            workersDictionary = UserRequests.GetWorkersDictionary(TeamHead.UserId);
            chart1.Series[0].Points.DataBindXY(workersDictionary.Keys, workersDictionary.Values);
        }
    }
}
