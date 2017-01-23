using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lawnhiro_WebApp.Models
{
    public class Orders
    {
        public int OrderID { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PayPalOrderID { get; set; }
    }
}