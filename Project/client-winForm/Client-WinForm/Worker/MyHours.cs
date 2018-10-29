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

namespace Client_WinForm.Worker
{
    public partial class MyHours : Form
    {
        public MyHours(User worker)
        {

            InitializeComponent();
            Dictionary<string, decimal> workersDictionary = new Dictionary<string, decimal>();
            workersDictionary = TaskRequests.GetWorkerTasksDictionary(worker.UserId);
            chart1.Series[0].Points.DataBindXY(workersDictionary.Keys, workersDictionary.Values);
        }
    }
}
