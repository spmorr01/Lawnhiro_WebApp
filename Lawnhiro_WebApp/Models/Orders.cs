using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lawnhiro_WebApp.Models
{
    public class Orders
    {
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }
        public TimeSpan OrderTime { get; set; }
        public string BusinessSource { get; set; }
        public string PayPalOrderID { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string ServiceType { get; set; }
        public double CalculationResultArea { get; set; }
        public double CalculationResultPrice { get; set; }
        public string CustomerNotes { get; set; }
        public string ProviderNotes { get; set; }
        public bool Active { get; set; }
    }
}