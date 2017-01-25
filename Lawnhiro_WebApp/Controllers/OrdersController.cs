using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lawnhiro_WebApp.Models;

namespace Lawnhiro_WebApp.Controllers
{
    public class OrdersController : ApiController
    {
        //Orders[] orders = new Orders[] //add a comment
        //{
        //    new Orders {OrderID = 1, Address = "Test Address", Email = "mail@mail.com", PayPalOrderID = "PAY123" },
        //    new Orders {OrderID = 2, Address = "Test Address2", Email = "mai2l@mail.com", PayPalOrderID = "PAY1234" },
        //    new Orders {OrderID = 3, Address = "Test Address3", Email = "mail3@mail.com", PayPalOrderID = "PAY12345" }
        //};

        // GET api/<controller>

        DAL.AccessOrders accessOrders = new DAL.AccessOrders();
        public IEnumerable<Orders> GetAllOrders()
        {
            return accessOrders.getActiveOrders();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
